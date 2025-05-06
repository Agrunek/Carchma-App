import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import { balance, normalize } from '../utils/aggregation.js';
import { ONE_DAY } from '../constants/time.js';

const collection = db.collection('adverts');
await collection.createSearchIndex({
  definition: {
    analyzer: 'custom',
    searchAnalyzer: 'custom',
    mappings: { dynamic: true },
    analyzers: [
      {
        name: 'custom',
        tokenizer: { type: 'standard' },
        tokenFilters: [{ type: 'lowercase' }, { type: 'asciiFolding' }],
      },
    ],
  },
});

const PAGE_SIZE = 20;
const SCORE_FACTOR = 0.5;
const AGE_FACTOR = 0.5;

export const getAdvertById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return collection.findOne(query, { projection: { updatedAt: 0 } });
};

export const getAdverts = async (page = 1, search = '', filterOptions = {}) => {
  const timestamp = new Date();
  const skip = (page - 1) * PAGE_SIZE;

  const searchPipeline = {
    $search: { index: 'default', text: { query: search, path: ['title', 'description'], fuzzy: { maxEdits: 1 } } },
  };

  const ageInDays = { $trunc: [{ $divide: [{ $subtract: [timestamp, '$createdAt'] }, ONE_DAY] }] };

  const dataPipeline = [
    {
      $setWindowFields: {
        output: {
          _minScore: { $min: '$score' },
          _maxScore: { $max: '$score' },
          _minAge: { $min: ageInDays },
          _maxAge: { $max: ageInDays },
        },
      },
    },

    {
      $addFields: {
        _scoreRating: normalize('$score', '$_minScore', '$_maxScore'),
        _ageRating: normalize(ageInDays, '$_minAge', '$_maxAge', true),
      },
    },

    { $addFields: { _rating: balance('$_scoreRating', SCORE_FACTOR, '$_ageRating', AGE_FACTOR) } },

    { $sort: { _rating: -1 } },

    { $skip: skip },

    { $limit: PAGE_SIZE },

    {
      $project: {
        _id: 1,
        userId: 1,
        mileage: 1,
        damaged: 1,
        year: 1,
        fuel: 1,
        power: 1,
        displacement: 1,
        gearbox: 1,
        title: 1,
        price: 1,
        verified: 1,
      },
    },
  ];

  const matchFilters = {};

  matchFilters.mileage = { $gte: filterOptions.minMileage || 0, $lte: filterOptions.maxMileage || Infinity };
  if (filterOptions.damaged !== undefined) matchFilters.damaged = filterOptions.damaged;
  if (filterOptions.make !== undefined) matchFilters.make = filterOptions.make;
  if (filterOptions.model !== undefined) matchFilters.model = filterOptions.model;
  matchFilters.year = { $gte: filterOptions.minYear || 0, $lte: filterOptions.maxYear || Infinity };
  if (filterOptions.fuel !== undefined) matchFilters.fuel = { $in: filterOptions.fuel };
  matchFilters.power = { $gte: filterOptions.minPower || 0, $lte: filterOptions.maxPower || Infinity };
  if (filterOptions.gearbox !== undefined) matchFilters.gearbox = filterOptions.gearbox;
  if (filterOptions.body !== undefined) matchFilters.body = { $in: filterOptions.body };
  if (filterOptions.color !== undefined) matchFilters.color = { $in: filterOptions.color };

  const finalPipeline = [
    { $match: matchFilters },

    { $facet: { data: dataPipeline, count: [{ $count: 'total' }] } },

    {
      $addFields: {
        currentCount: { $size: '$data' },
        currentPage: page,
        pageSize: PAGE_SIZE,
        totalPages: { $ceil: { $divide: [{ $arrayElemAt: ['$count.total', 0] }, PAGE_SIZE] } },
      },
    },

    {
      $project: {
        meta: {
          currentCount: '$currentCount',
          currentPage: '$currentPage',
          pageSize: '$pageSize',
          totalPages: '$totalPages',
        },
        data: '$data',
      },
    },
  ];

  const query = search ? [searchPipeline, ...finalPipeline] : finalPipeline;

  return collection.aggregate(query).next();
};

export const getAdvertsByUserId = async (userId) => {
  const query = { userId: new ObjectId(userId) };

  return collection.find(query, { projection: { updatedAt: 0 } }).toArray();
};

export const createAdvert = async (userId, advert, initialScore) => {
  const timestamp = new Date();

  const newDocument = {
    userId: new ObjectId(userId),
    type: advert.type,
    vin: advert.vin,
    registrationNumber: advert.registrationNumber,
    dateOfFirstRegistration: advert.dateOfFirstRegistration,
    mileage: advert.mileage,
    damaged: advert.damaged,
    make: advert.make,
    model: advert.model,
    year: advert.year,
    fuel: advert.fuel,
    power: advert.power,
    displacement: advert.displacement,
    doors: advert.doors,
    gearbox: advert.gearbox,
    body: advert.body,
    color: advert.color,
    title: null,
    price: null,
    description: null,
    initialScore: initialScore,
    score: initialScore,
    published: false,
    verified: false,
    closed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await collection.insertOne(newDocument);

  delete newDocument.updatedAt;

  return { _id: result.insertedId, ...newDocument };
};

export const updateAdvertById = async (id, advert) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { ...advert, updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates, { ignoreUndefined: true });

  return { updated: result.modifiedCount === 1 };
};

export const updateAdvertScoreById = async (id, score) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { score: score, updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};
