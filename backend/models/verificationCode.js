import db from '../db/connection.js';
import { EMAIL_VERIFICATION, PASSWORD_RESET } from '../constants/verificationType.js';
import { ONE_HOUR, ONE_YEAR } from '../constants/time.js';

const delay = {
  [EMAIL_VERIFICATION]: ONE_YEAR,
  [PASSWORD_RESET]: ONE_HOUR,
};

export const createVerificationCode = async (userId, type) => {
  const timestamp = new Date();
  const verificationCodeTimeout = new Date(Date.now() + delay[type]);

  const newDocument = {
    userId: userId,
    type: type,
    createdAt: timestamp,
    expiresAt: verificationCodeTimeout,
  };

  const collection = await db.collection('verifications');
  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};
