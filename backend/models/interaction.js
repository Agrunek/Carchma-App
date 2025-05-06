import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

const collection = db.collection('interactions');
await collection.createIndex({ userId: 1, targetId: 1, action: 1 }, { unique: true });

export const getInteractionByUserIdAndTargetIdAndAction = async (userId, targetId, action) => {
  const query = { userId: new ObjectId(userId), targetId: new ObjectId(targetId), action: action };

  return collection.findOne(query, { projection: { updatedAt: 0 } });
};

export const createInteraction = async (userId, targetId, action, value) => {
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

  delete newDocument.updatedAt;

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
