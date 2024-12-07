import db from '../db/connection.js';
import { hashValue } from '../utils/bcrypt.js';

export const getUserByEmail = async (email) => {
  const query = { email: email };

  const collection = await db.collection('users');
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

  const collection = await db.collection('users');
  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};
