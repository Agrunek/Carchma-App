import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import { ONE_MONTH } from '../constants/time.js';

const collection = db.collection('sessions');
await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const getSessionById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return await collection.findOne(query);
};

export const createSession = async (userId, agent) => {
  const timestamp = new Date();
  const sessionTimeout = new Date(Date.now() + ONE_MONTH);

  const newDocument = {
    userId: ObjectId(userId),
    userAgent: agent,
    createdAt: timestamp,
    expiresAt: sessionTimeout,
  };

  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};

export const resetSessionById = async (id) => {
  const sessionTimeout = new Date(Date.now() + ONE_MONTH);

  const query = { _id: new ObjectId(id) };
  const updates = { $set: { expiresAt: sessionTimeout } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};

export const deleteSessionById = async (id) => {
  const query = { _id: new ObjectId(id) };

  const result = await collection.deleteOne(query);

  return { deleted: result.deletedCount === 1 };
};
