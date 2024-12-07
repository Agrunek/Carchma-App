import db from '../db/connection.js';
import { ONE_MONTH } from '../constants/time.js';

export const createSession = async (userId, agent) => {
  const timestamp = new Date();
  const sessionTimeout = new Date(Date.now() + ONE_MONTH);

  const newDocument = {
    userId: userId,
    userAgent: agent,
    createdAt: timestamp,
    expiresAt: sessionTimeout,
  };

  const collection = await db.collection('sessions');
  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};
