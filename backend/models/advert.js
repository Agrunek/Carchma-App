import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import { ONE_DAY } from '../constants/time.js';

const collection = db.collection('adverts');

const PAGE_SIZE = 20;
const SCORE_FACTOR = 0.3;
const AGE_FACTOR = 0.7;

export const getAdvertById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return collection.findOne(query);
};

export const getAdverts = async (page = 1) => {
  const timestamp = new Date();
  const skip = (page - 1) * PAGE_SIZE;
  const query = [
    {
      $facet: {
        meta: [{ $count: 'total' }],
        data: [
          {
            $setWindowFields: {
              output: {
                _minScore: { $min: '$score' },
                _maxScore: { $max: '$score' },
                _minAge: { $min: { $trunc: [{ $divide: [{ $subtract: [timestamp, '$createdAt'] }, ONE_DAY] }] } },
                _maxAge: { $max: { $trunc: [{ $divide: [{ $subtract: [timestamp, '$createdAt'] }, ONE_DAY] }] } },
              },
            },
          },
          {
            $addFields: {
              _score: {
                $cond: {
                  if: { $eq: ['$_minScore', '$_maxScore'] },
                  then: 1,
                  else: {
                    $divide: [{ $subtract: ['$score', '$_minScore'] }, { $subtract: ['$_maxScore', '$_minScore'] }],
                  },
                },
              },
              _age: {
                $cond: {
                  if: { $eq: ['$_minAge', '$_maxAge'] },
                  then: 1,
                  else: {
                    $divide: [
                      {
                        $subtract: [
                          '$_maxAge',
                          { $trunc: [{ $divide: [{ $subtract: [timestamp, '$createdAt'] }, ONE_DAY] }] },
                        ],
                      },
                      { $subtract: ['$_maxAge', '$_minAge'] },
                    ],
                  },
                },
              },
            },
          },
          {
            $addFields: {
              _ranking: {
                $add: [{ $multiply: ['$_score', SCORE_FACTOR] }, { $multiply: ['$_age', AGE_FACTOR] }],
              },
            },
          },
          { $sort: { _ranking: -1 } },
          {
            $unset: [
              'initialScore',
              'score',
              '_minScore',
              '_maxScore',
              '_minAge',
              '_maxAge',
              '_score',
              '_age',
              '_ranking',
            ],
          },
          { $skip: skip },
          { $limit: PAGE_SIZE },
        ],
      },
    },
  ];

  const result = await collection.aggregate(query).next();

  result.meta = { total: result.meta[0].total, page: page, size: PAGE_SIZE };

  return result;
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
