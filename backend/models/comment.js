import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

const collection = db.collection('comments');

const PAGE_SIZE = 20;

export const getCommentById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return collection.findOne(query);
};

export const getCommentsByAdvertId = async (advertId) => {
  const query = { advertId: new ObjectId(advertId) };

  return collection.find(query).toArray();
};

export const getCommentsPaginatedByAdvertId = async (advertId, page = 1) => {
  const skip = (page - 1) * PAGE_SIZE;

  const pipeline = [
    { $match: { advertId: new ObjectId(advertId) } },

    {
      $facet: {
        data: [{ $sort: { createdAt: 1 } }, { $skip: skip }, { $limit: PAGE_SIZE }],
        count: [{ $count: 'total' }],
      },
    },

    {
      $addFields: {
        currentCount: { $size: '$data' },
        currentPage: page,
        pageSize: PAGE_SIZE,
        totalPages: { $ceil: { $divide: [{ $ifNull: [{ $arrayElemAt: ['$count.total', 0] }, 0] }, PAGE_SIZE] } },
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

export const getCommentsByUserId = async (userId) => {
  const query = { userId: new ObjectId(userId) };

  return collection.find(query).toArray();
};

export const createComment = async (advertId, userId, status, content) => {
  const timestamp = new Date();

  const newDocument = {
    advertId: new ObjectId(advertId),
    userId: new ObjectId(userId),
    status: status,
    content: content,
    likes: 0,
    dislikes: 0,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};

export const updateCommentById = async (id, status, content) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { status: status, content: content, updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};

export const reactToCommentById = async (id, { like = null, dislike = null } = {}) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const likeUpdate = like === null ? 0 : like ? 1 : -1;
  const dislikeUpdate = dislike === null ? 0 : dislike ? 1 : -1;
  const updates = { $inc: { likes: likeUpdate, dislikes: dislikeUpdate }, $set: { updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};

export const deleteCommentById = async (id) => {
  const query = { _id: new ObjectId(id) };

  const result = await collection.deleteOne(query);

  return { deleted: result.deletedCount === 1 };
};
