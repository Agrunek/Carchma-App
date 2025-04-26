import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import { ONE_DAY } from '../constants/time.js';

const collection = db.collection('adverts');
await collection.createSearchIndex({ definition: { mappings: { dynamic: true } } });

const PAGE_SIZE = 20;
const SCORE_FACTOR = 0.3;
const AGE_FACTOR = 0.7;

export const getAdvertById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return collection.findOne(query);
};

export const getAdverts = async (page = 1, search = '') => {
  const timestamp = new Date();
  const skip = (page - 1) * PAGE_SIZE;

  const searchPipeline = { $search: { index: 'default', text: { query: search, path: ['title', 'description'] } } };

  const dataPipelineMinMax = {
    $setWindowFields: {
      output: {
        _minScore: { $min: '$score' },
        _maxScore: { $max: '$score' },
        _minAge: { $min: { $trunc: [{ $divide: [{ $subtract: [timestamp, '$createdAt'] }, ONE_DAY] }] } },
        _maxAge: { $max: { $trunc: [{ $divide: [{ $subtract: [timestamp, '$createdAt'] }, ONE_DAY] }] } },
      },
    },
  };

  const dataPipelineValues = {
    $addFields: {
      _score: {
        $cond: {
          if: { $eq: ['$_minScore', '$_maxScore'] },
          then: 1,
          else: { $divide: [{ $subtract: ['$score', '$_minScore'] }, { $subtract: ['$_maxScore', '$_minScore'] }] },
        },
      },
      _age: {
        $cond: {
          if: { $eq: ['$_minAge', '$_maxAge'] },
          then: 1,
          else: {
            $divide: [
              {
                $subtract: ['$_maxAge', { $trunc: [{ $divide: [{ $subtract: [timestamp, '$createdAt'] }, ONE_DAY] }] }],
              },
              { $subtract: ['$_maxAge', '$_minAge'] },
            ],
          },
        },
      },
    },
  };

  const dataPipelineRank = {
    $addFields: {
      _ranking: { $add: [{ $multiply: ['$_score', SCORE_FACTOR] }, { $multiply: ['$_age', AGE_FACTOR] }] },
    },
  };

  const dataPipelineSort = { $sort: { _ranking: -1 } };

  const dataPipelineSkip = { $skip: skip };

  const dataPipelineLimit = { $limit: PAGE_SIZE };

  const dataPipelineProject = {
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
  };

  const dataPipeline = [
    dataPipelineMinMax,
    dataPipelineValues,
    dataPipelineRank,
    dataPipelineSort,
    dataPipelineSkip,
    dataPipelineLimit,
    dataPipelineProject,
  ];

  const countPipeline = [{ $count: 'total' }];

  const finalPipelineMix = {
    $facet: {
      data: dataPipeline,
      count: countPipeline,
    },
  };

  const finalPipelineValues = {
    $addFields: {
      currentCount: { $size: '$data' },
      currentPage: page,
      pageSize: PAGE_SIZE,
      totalPages: { $ceil: { $divide: [{ $arrayElemAt: ['$count.total', 0] }, PAGE_SIZE] } },
    },
  };

  const finalPipelineProject = {
    $project: {
      meta: {
        currentCount: '$currentCount',
        currentPage: '$currentPage',
        pageSize: '$pageSize',
        totalPages: '$totalPages',
      },
      data: '$data',
    },
  };

  const finalPipeline = [finalPipelineMix, finalPipelineValues, finalPipelineProject];

  const query = search ? [searchPipeline, ...finalPipeline] : finalPipeline;

  return collection.aggregate(query).next();
};

export const getAdvertsByUserId = async (userId) => {
  const query = { userId: new ObjectId(userId) };

  return collection.find(query).toArray();
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
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { score: score } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};
