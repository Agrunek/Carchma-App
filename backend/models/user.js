import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import { hashValue } from '../utils/bcrypt.js';

const collection = db.collection('users');
await collection.createIndex({ email: 1 }, { unique: true });

export const getUserByEmail = async (email) => {
  const query = { email: email };

  return await collection.findOne(query);
};

export const createUser = async (email, password) => {
  const hashedPassword = await hashValue(password);
  const timestamp = new Date();

  const newDocument = {
    email: email,
    password: hashedPassword,
    verified: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};

export const verifyUserById = async (id) => {
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { verified: true } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};
