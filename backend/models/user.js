import db from '../db/connection.js';
import { hashValue } from '../utils/bcrypt.js';

export const userEmailExists = async (email) => {
  const query = { email: email };

  const collection = await db.collection('users');
  const result = await collection.findOne(query);

  return !!result;
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

  /* Prevent return of the generated password: */
  delete newDocument.password;

  return { _id: result.insertedId, ...newDocument };
};
