import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

const collection = db.collection('adverts');

export const getAdvertById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return await collection.findOne(query);
};

export const createAdvert = async (userId, advert) => {
  const timestamp = new Date();

  const newDocument = {
    userId: new ObjectId(userId),
    ...advert,
    verified: false,
    published: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};

export const verifyAdvertById = async (id) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { verified: true, updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};

export const publishAdvertById = async (id) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { published: true, updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};

export const updateAdvertById = async (id, advert) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { ...advert, updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};
