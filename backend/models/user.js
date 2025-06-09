import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import { hashValue } from '../utils/bcrypt.js';
import { USER } from '../constants/permission.js';

const collection = db.collection('users');
await collection.createIndex({ email: 1 }, { unique: true });

export const getUserById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return collection.findOne(query);
};

export const getUserByEmail = async (email) => {
  const query = { email: email };

  return collection.findOne(query);
};

export const createUser = async (name, email, password) => {
  const hashedPassword = await hashValue(password);
  const timestamp = new Date();

  const newDocument = {
    name: name,
    email: email,
    password: hashedPassword,
    verified: false,
    permissions: [USER],
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};

export const verifyUserById = async (id) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { verified: true, updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};

export const resetUserPasswordById = async (id, password) => {
  const hashedPassword = await hashValue(password);
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { password: hashedPassword, updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};
