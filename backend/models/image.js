import { Readable } from 'node:stream';
import { ObjectId } from 'mongodb';
import bucket from '../db/bucket.js';

export const getImageCursorById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return bucket.find(query).next();
};

export const getImageCursorsByAdvertId = async (advertId) => {
  const query = { 'metadata.advertId': new ObjectId(advertId) };

  return bucket.find(query).toArray();
};

export const getImageDownloadStreamById = async (id) => {
  return bucket.openDownloadStream(new ObjectId(id));
};

export const createImage = async (advertId, userId, file) => {
  const { buffer, originalname, mimetype } = file;

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(originalname, {
      metadata: {
        advertId: new ObjectId(advertId),
        userId: new ObjectId(userId),
        mimetype: mimetype,
      },
    });

    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    bufferStream.pipe(uploadStream).on('finish', resolve).on('error', reject);
  });
};

export const deleteImageById = async (id) => {
  await bucket.delete(new ObjectId(id));
};
