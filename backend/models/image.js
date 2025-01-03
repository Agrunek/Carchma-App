import { Readable } from 'node:stream';
import { ObjectId } from 'mongodb';
import bucket from '../db/bucket.js';

export const getImageCursorArrayById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return bucket.find(query).toArray();
};

export const getImageDownloadStreamById = async (id) => {
  return bucket.openDownloadStream(new ObjectId(id));
};

export const createImage = async (advertId, image) => {
  const { buffer, originalname, mimetype } = image;

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(originalname, {
      metadata: {
        advertId: new ObjectId(advertId),
        mimetype: mimetype,
      },
    });

    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    bufferStream.pipe(uploadStream).on('finish', resolve).on('error', reject);
  });
};
