import { z } from 'zod';

const mongoIdPattern = z.string().length(24);
const vinPattern = z.string().min(1).max(17).toUpperCase();
const registrationNumberPattern = z.string().min(1).max(8).toUpperCase();
const datePattern = z.string().date();
const mileagePattern = z.number().nonnegative().int();

const advertPattern = z.object({
  userId: mongoIdPattern,
  vin: vinPattern,
  registrationNumber: registrationNumberPattern,
  dateOfFirstRegistration: datePattern,
  mileage: mileagePattern,
});

export const advertSchema = advertPattern;
