import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

const collection = db.collection('interactions');
await collection.createIndex({ userId: 1, targetId: 1, action: 1 }, { unique: true });

const PAGE_SIZE = 50;

export const getInteractionByUserIdAndTargetIdAndAction = async (userId, targetId, action) => {
  const query = { userId: new ObjectId(userId), targetId: new ObjectId(targetId), action: action };

  return collection.findOne(query);
};

export const getInteractionsByActions = async (page = 1, actions = []) => {
  const skip = (page - 1) * PAGE_SIZE;

  const pipeline = [
    { $match: { action: { $in: actions } } },

    {
      $facet: {
        data: [
          { $sort: { createdAt: 1 } },
          { $skip: skip },
          { $limit: PAGE_SIZE },
          { $project: { _id: 1, userId: 1, targetId: 1, action: 1, value: 1 } },
        ],
        count: [{ $count: 'total' }],
      },
    },

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

  return collection.aggregate(pipeline).next();
};

export const createInteraction = async (userId, targetId, action, value = null) => {
  const timestamp = new Date();

  const newDocument = {
    userId: new ObjectId(userId),
    targetId: new ObjectId(targetId),
    action: action,
    value: value,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};

export const updateInteractionByUserIdAndTargetIdAndAction = async (userId, targetId, action, value) => {
  const timestamp = new Date();
  const query = { userId: new ObjectId(userId), targetId: new ObjectId(targetId), action: action };
  const updates = { $set: { value: value, updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};

export const deleteInteractionByUserIdAndTargetIdAndAction = async (userId, targetId, action) => {
  const query = { userId: new ObjectId(userId), targetId: new ObjectId(targetId), action: action };

  const result = await collection.deleteOne(query);

  return { deleted: result.deletedCount === 1 };
};
