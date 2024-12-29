import { z } from 'zod';
import { CAR_BODIES, CAR_FUELS, CAR_GEARBOXES, CAR_MAKES, CAR_TYPES } from '../constants/car.js';

const mongoIdPattern = z.string().length(24);
const typePattern = z.enum(CAR_TYPES);
const titlePattern = z.string().min(1).max(255);
const descriptionPattern = z.string().min(1).max(5000);
const vinPattern = z.string().min(1).max(17).toUpperCase();
const registrationNumberPattern = z.string().min(1).max(8).toUpperCase();
const dateOfFirstRegistrationPattern = z.string().date();
const mileagePattern = z.number().int().nonnegative();
const makePattern = z.enum(CAR_MAKES);
const modelPattern = z.string().min(1).max(255);
const yearPattern = z.number().int().min(1900);
const fuelPattern = z.enum(CAR_FUELS);
const horsepowerPattern = z.number().int().positive();
const engineDisplacementPattern = z.number().int().positive();
const doorsPattern = z.number().int().positive();
const gearboxPattern = z.enum(CAR_GEARBOXES);
const bodyPattern = z.enum(CAR_BODIES);
const colorPattern = z.string().min(1).max(255).toLowerCase();

const advertPattern = z.object({
  userId: mongoIdPattern,
  type: typePattern,
  title: titlePattern,
  description: descriptionPattern,
  vin: vinPattern,
  registrationNumber: registrationNumberPattern,
  dateOfFirstRegistration: dateOfFirstRegistrationPattern,
  mileage: mileagePattern,
  make: makePattern,
  model: modelPattern,
  year: yearPattern,
  fuel: fuelPattern,
  horsepower: horsepowerPattern,
  engineDisplacement: engineDisplacementPattern,
  doors: doorsPattern,
  gearbox: gearboxPattern,
  body: bodyPattern,
  color: colorPattern,
});

export const advertSchema = advertPattern;
