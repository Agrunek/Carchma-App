import { z } from 'zod';
import { extractId, findItemById, selectField } from '../utils/car.js';
import {
  BODY_TYPES_KEY,
  CAR_MAKES_KEY,
  CAR_MODELS_KEY,
  CAR_TYPES_KEY,
  COLORS_KEY,
  FUEL_TYPES_KEY,
  GEARBOX_TYPES_KEY,
} from '../constants/car.js';

const carTypes = selectField(CAR_TYPES_KEY);
const carMakes = selectField(CAR_MAKES_KEY);
const carModels = selectField(CAR_MODELS_KEY);
const fuelTypes = selectField(FUEL_TYPES_KEY);
const gearboxTypes = selectField(GEARBOX_TYPES_KEY);
const bodyTypes = selectField(BODY_TYPES_KEY);
const colors = selectField(COLORS_KEY);

/* Configuration */
const mongoIdPattern = z.string().length(24);
const typePattern = z.enum(carTypes.map(extractId), { message: 'Invalid car type' });

/* General information */
const vinPattern = z.string().min(1).max(17).toUpperCase();
const registrationNumberPattern = z.string().min(1).max(8).toUpperCase();
const dateOfFirstRegistrationPattern = z.string().date();
const mileagePattern = z.number().int().nonnegative();
const damagedPattern = z.boolean();

/* Technical information */
const makePattern = z.enum(carMakes.map(extractId), { message: 'Invalid car make' });
const modelPattern = z.enum(carModels.map(extractId), { message: 'Invalid car model' });
const yearPattern = z.number().int().min(1900);
const fuelPattern = z.enum(fuelTypes.map(extractId), { message: 'Invalid fuel type' });
const powerPattern = z.number().int().positive();
const displacementPattern = z.number().int().positive();
const doorsPattern = z.number().int().positive();
const gearboxPattern = z.enum(gearboxTypes.map(extractId), { message: 'Invalid gearbox type' });
const bodyPattern = z.enum(bodyTypes.map(extractId), { message: 'Invalid body type' });
const colorPattern = z.enum(colors.map(extractId), { message: 'Invalid color' });

/* Additional information */
const titlePattern = z.string().min(1).max(100);
const pricePattern = z.number().positive().multipleOf(0.01);
const descriptionPattern = z.string().min(1).max(5000);

const pagePattern = z.coerce.number().int().positive().optional();

const carPattern = z.object({
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

const customPattern = z.object({
  title: titlePattern,
  price: pricePattern,
  description: descriptionPattern,
});

const createMetaPattern = z.object({
  userId: mongoIdPattern,
});

const updateMetaPattern = z.object({
  advertId: mongoIdPattern,
  userId: mongoIdPattern,
});

const createPattern = createMetaPattern.merge(carPattern);

const updatePattern = z.union([
  updateMetaPattern.merge(carPattern).merge(customPattern),
  updateMetaPattern.merge(carPattern).strict(),
  updateMetaPattern.merge(customPattern).strict(),
]);

const advertPattern = z.object({
  advertId: mongoIdPattern,
});

const searchPattern = z.object({
  page: pagePattern,
});

const carRefine = (data, context) => {
  if (!data.type && !data.body && !data.make && !data.model) {
    return;
  }

  const carType = findItemById(carTypes, data.type);

  const bodyType = findItemById(carType[BODY_TYPES_KEY], data.body);
  if (!bodyType) {
    context.addIssue({ message: 'Provided body type does not match the car type', path: ['body'] });
  }

  const carMake = findItemById(carType[CAR_MAKES_KEY], data.make);
  if (!carMake) {
    context.addIssue({ message: 'Provided car make does not match the car type', path: ['make'] });
    return;
  }

  const carModel = findItemById(carMake[CAR_MODELS_KEY], data.model);
  if (!carModel) {
    context.addIssue({ message: 'Provided car model does not match the car make', path: ['model'] });
  }
};

export const createSchema = createPattern.superRefine(carRefine);

export const updateSchema = updatePattern.superRefine(carRefine);

export const advertSchema = advertPattern;

export const searchSchema = searchPattern;
