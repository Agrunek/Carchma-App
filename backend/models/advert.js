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

  return collection.findOne(query);
};

export const getAdverts = async (page = 1, search = '', options = {}) => {
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

  const filters = { published: true, closed: false };

  filters.mileage = { $gte: options.minMileage || 0, $lte: options.maxMileage || Infinity };
  filters.damaged = options.damaged;
  filters.make = options.make;
  filters.model = options.model;
  filters.year = { $gte: options.minYear || 0, $lte: options.maxYear || Infinity };
  filters.fuel = options.fuel ? { $in: options.fuel } : undefined;
  filters.power = { $gte: options.minPower || 0, $lte: options.maxPower || Infinity };
  filters.gearbox = options.gearbox;
  filters.body = options.body ? { $in: options.body } : undefined;
  filters.color = options.color ? { $in: options.color } : undefined;

  for (const key in filters) {
    if (filters[key] === undefined) {
      delete filters[key];
    }
  }

  const finalPipeline = [
    { $match: filters },

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

  return collection.find(query).toArray();
};

export const createAdvert = async (userId, template, initialScore) => {
  const timestamp = new Date();

  const newDocument = {
    userId: new ObjectId(userId),
    type: template.type,
    vin: template.vin,
    registrationNumber: template.registrationNumber,
    dateOfFirstRegistration: template.dateOfFirstRegistration,
    mileage: template.mileage,
    damaged: template.damaged,
    make: template.make,
    model: template.model,
    year: template.year,
    fuel: template.fuel,
    power: template.power,
    displacement: template.displacement,
    doors: template.doors,
    gearbox: template.gearbox,
    body: template.body,
    color: template.color,
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

  return { _id: result.insertedId, ...newDocument };
};

export const updateAdvertById = async (id, changes) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { ...changes, updatedAt: timestamp } };

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

export const deleteAdvertById = async (id) => {
  const query = { _id: new ObjectId(id) };

  const result = await collection.deleteOne(query);

  return { deleted: result.deletedCount === 1 };
};
