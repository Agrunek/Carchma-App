import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

const collection = db.collection('adverts');

export const getAdvertById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return collection.findOne(query);
};

export const getAdvertsByUserId = async (userId) => {
  const query = { userId: new ObjectId(userId) };

  return collection.find(query).toArray();
};

export const createAdvert = async (userId, advert, initialScore) => {
  const timestamp = new Date();

  const newDocument = {
    userId: new ObjectId(userId),
    type: advert.type,
    vin: advert.vin,
    registrationNumber: advert.registrationNumber,
    dateOfFirstRegistration: advert.dateOfFirstRegistration,
    mileage: advert.mileage,
    damaged: advert.damaged,
    make: advert.make,
    model: advert.model,
    year: advert.year,
    fuel: advert.fuel,
    power: advert.power,
    displacement: advert.displacement,
    doors: advert.doors,
    gearbox: advert.gearbox,
    body: advert.body,
    color: advert.color,
    title: null,
    price: null,
    description: null,
    initialScore: initialScore,
    score: initialScore,
    published: false,
    verified: false,
    closed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};

export const updateAdvertById = async (id, advert) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { ...advert, updatedAt: timestamp } };

  const result = await collection.updateOne(query, updates, { ignoreUndefined: true });

  return { updated: result.modifiedCount === 1 };
};

export const updateAdvertScoreById = async (id, score) => {
  const query = { _id: new ObjectId(id) };
  const updates = { $set: { score: score } };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};
