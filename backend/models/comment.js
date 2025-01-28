import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

const collection = db.collection('comments');

export const getCommentById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return collection.findOne(query);
};

export const createComment = async (advertId, userId, content) => {
  const timestamp = new Date();

  const newDocument = {
    advertId: new ObjectId(advertId),
    userId: new ObjectId(userId),
    content: content,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};

export const updateCommentById = async (id, content) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { content: content, updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};

export const deleteCommentById = async (id) => {
  const query = { _id: new ObjectId(id) };

  const result = await collection.deleteOne(query);

  return { deleted: result.deletedCount === 1 };
};
