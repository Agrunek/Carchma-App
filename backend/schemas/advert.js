import { z } from 'zod';
import {
  BODY_TYPES,
  CAR_MAKES,
  CAR_MODELS,
  CAR_TYPES,
  COLORS,
  FUEL_TYPES,
  GEARBOX_TYPES,
  extractCarItemById,
  mapCarItemsIds,
} from '../utils/car.js';
import { BODY_TYPES_KEY, CAR_MAKES_KEY, CAR_MODELS_KEY } from '../constants/car.js';

/* Configuration */
const mongoIdPattern = z.string().length(24);
const typePattern = z.enum(mapCarItemsIds(CAR_TYPES));

/* General information */
const vinPattern = z.string().min(1).max(17).toUpperCase();
const registrationNumberPattern = z.string().min(1).max(8).toUpperCase();
const dateOfFirstRegistrationPattern = z.string().date();
const mileagePattern = z.number().int().nonnegative();
const damagedPattern = z.boolean();

/* Technical information */
const makePattern = z.enum(mapCarItemsIds(CAR_MAKES));
const modelPattern = z.enum(mapCarItemsIds(CAR_MODELS));
const yearPattern = z.number().int().min(1900);
const fuelPattern = z.enum(mapCarItemsIds(FUEL_TYPES));
const powerPattern = z.number().int().positive();
const displacementPattern = z.number().int().positive();
const doorsPattern = z.number().int().positive();
const gearboxPattern = z.enum(mapCarItemsIds(GEARBOX_TYPES));
const bodyPattern = z.enum(mapCarItemsIds(BODY_TYPES));
const colorPattern = z.enum(mapCarItemsIds(COLORS));

/* Additional information */
const titlePattern = z.string().min(1).max(100);
const pricePattern = z.number().positive().multipleOf(0.01);
const descriptionPattern = z.string().min(1).max(5000);

const createFirstStepPattern = z.object({
  userId: mongoIdPattern,
  type: typePattern,
  vin: vinPattern,
  registrationNumber: registrationNumberPattern,
  dateOfFirstRegistration: dateOfFirstRegistrationPattern,
  mileage: mileagePattern,
  damaged: damagedPattern,
  make: makePattern,
  model: modelPattern,
  year: yearPattern,
  fuel: fuelPattern,
  power: powerPattern,
  displacement: displacementPattern,
  doors: doorsPattern,
  gearbox: gearboxPattern,
  body: bodyPattern,
  color: colorPattern,
});

const createSecondStepPattern = z.object({
  userId: mongoIdPattern,
  advertId: mongoIdPattern,
  title: titlePattern,
  price: pricePattern,
  description: descriptionPattern,
});

export const createFirstStepSchema = createFirstStepPattern.superRefine((data, context) => {
  const carType = extractCarItemById(CAR_TYPES, data.type);

  const bodyType = extractCarItemById(carType[BODY_TYPES_KEY], data.body);
  if (!bodyType) {
    context.addIssue({ message: 'Car body does not match the car type', path: ['body'] });
  }

  const carMake = extractCarItemById(carType[CAR_MAKES_KEY], data.make);
  if (!carMake) {
    context.addIssue({ message: 'Car make does not match the car type', path: ['make'] });
    return;
  }

  const carModel = extractCarItemById(carMake[CAR_MODELS_KEY], data.model);
  if (!carModel) {
    context.addIssue({ message: 'Car model does not match the car make', path: ['model'] });
  }
});

export const createSecondStepSchema = createSecondStepPattern;
