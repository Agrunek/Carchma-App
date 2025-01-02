import { ObjectId } from 'mongodb';
import db from '../db/connection.js';

const collection = db.collection('adverts');

export const getAdvertByIdAndUserId = async (id, userId) => {
  const query = { _id: new ObjectId(id), userId: new ObjectId(userId) };

  return await collection.findOne(query);
};

export const createAdvertFirstStep = async (userId, advert) => {
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
    images: [],
    step: 1,
    published: false,
    verified: false,
    closed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await collection.insertOne(newDocument);

  return { _id: result.insertedId, ...newDocument };
};

export const createAdvertSecondStep = async (id, advert) => {
  const timestamp = new Date();
  const query = { _id: new ObjectId(id) };
  const updates = {
    $set: {
      title: advert.title,
      price: advert.price,
      description: advert.description,
      step: 2,
      updatedAt: timestamp,
    },
  };

  const result = await collection.updateOne(query, updates);

  return { updated: result.modifiedCount === 1 };
};
