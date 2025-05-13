import { z } from 'zod';
import appAssert from '../utils/appAssert.js';
import { avoidField, findItemById, selectField } from '../utils/car.js';
import { CAR_MAKES_KEY, CAR_MODELS_KEY } from '../constants/car.js';
import { NOT_FOUND, OK } from '../constants/http.js';

const makeSchema = z.string().min(1).max(100);

const carInfo = avoidField(CAR_MODELS_KEY);
const carMakes = selectField(CAR_MAKES_KEY);

export const carInfoHandler = async (req, res) => {
  return res.status(OK).json(carInfo);
};

export const carMakeInfoHandler = async (req, res) => {
  const makeId = makeSchema.parse(req.params.id);

  const make = findItemById(carMakes, makeId);
  appAssert(make, NOT_FOUND, 'Car make not found');

  return res.status(OK).json(make);
};
