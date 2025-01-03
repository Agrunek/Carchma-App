import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

const collection = db.collection('adverts');

export const getAdvertById = async (id) => {
  const query = { _id: new ObjectId(id) };

  return await collection.findOne(query);
};

export const getAdvertByIdAndUserId = async (id, userId) => {
  const query = { _id: new ObjectId(id), userId: new ObjectId(userId) };

  return await collection.findOne(query);
};

export const createAdvert = async (userId, advert) => {
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
    title: '',
    price: 1000,
    description: '',
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
