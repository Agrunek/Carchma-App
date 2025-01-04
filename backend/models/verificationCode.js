import { ObjectId } from 'mongodb';
import { randomBytes } from 'node:crypto';
import db from '../db/connection.js';
import { EMAIL_VERIFICATION, PASSWORD_RESET } from '../constants/verificationType.js';
import { ONE_HOUR, ONE_YEAR } from '../constants/time.js';

const collection = db.collection('verifications');
await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
await collection.createIndex({ signature: 1 }, { unique: true });

const delay = {
  [EMAIL_VERIFICATION]: ONE_YEAR,
  [PASSWORD_RESET]: ONE_HOUR,
};

export const getVerificationCodeBySignature = async (signature) => {
  const query = { signature: signature };

  return collection.findOne(query);
};

export const createVerificationCode = async (userId, type) => {
  const signature = randomBytes(64).toString('hex');
  const timestamp = new Date();
  const verificationCodeTimeout = new Date(Date.now() + delay[type]);

  const newDocument = {
    userId: new ObjectId(userId),
    signature: signature,
    type: type,
    createdAt: timestamp,
    expiresAt: verificationCodeTimeout,
  };

  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};

export const deleteVerificationCodeById = async (id) => {
  const query = { _id: new ObjectId(id) };

  const result = await collection.deleteOne(query);

  return { deleted: result.deletedCount === 1 };
};

export const countVerificationCodesByUserIdAndTypeAndOffset = async (userId, type, offset) => {
  const timestampGate = new Date(Date.now() - offset);
  const query = { userId: new ObjectId(userId), type: type, createdAt: { $gt: timestampGate } };

  return collection.countDocuments(query);
};
