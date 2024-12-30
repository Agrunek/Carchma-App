import { z } from 'zod';
import {
  BODY_TYPE_IDS,
  CAR_MAKE_IDS,
  CAR_MODEL_IDS,
  CAR_TYPE_IDS,
  CAR_TYPES,
  COLOR_IDS,
  FUEL_TYPE_IDS,
  GEARBOX_TYPE_IDS,
} from '../constants/car.js';

/* Configuration */
const mongoIdPattern = z.string().length(24);
const typePattern = z.enum(CAR_TYPE_IDS);

/* General information */
const vinPattern = z.string().min(1).max(17).toUpperCase();
const registrationNumberPattern = z.string().min(1).max(8).toUpperCase();
const dateOfFirstRegistrationPattern = z.string().date();
const mileagePattern = z.number().int().nonnegative();
const damagedPattern = z.boolean();

/* Technical information */
const makePattern = z.enum(CAR_MAKE_IDS);
const modelPattern = z.enum(CAR_MODEL_IDS);
const yearPattern = z.number().int().min(1900);
const fuelPattern = z.enum(FUEL_TYPE_IDS);
const powerPattern = z.number().int().positive();
const displacementPattern = z.number().int().positive();
const doorsPattern = z.number().int().positive();
const gearboxPattern = z.enum(GEARBOX_TYPE_IDS);
const bodyPattern = z.enum(BODY_TYPE_IDS);
const colorPattern = z.enum(COLOR_IDS);

const advertPattern = z.object({
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

export const advertSchema = advertPattern.superRefine((data, context) => {
  const carType = CAR_TYPES.find((type) => type.id === data.type);

  const bodyType = carType?.body_types.find((body) => body.id === data.body);
  if (!bodyType) {
    context.addIssue({ message: 'Car body does not match the car type', path: ['body'] });
  }

  const carMake = carType?.car_makes.find((make) => make.id === data.make);
  if (!carMake) {
    context.addIssue({ message: 'Car make does not match the car type', path: ['make'] });
    return;
  }

  const carModel = carMake.car_models.find((model) => model.id === data.model);
  if (!carModel) {
    context.addIssue({ message: 'Car model does not match the car make', path: ['model'] });
  }
});
