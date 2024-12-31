import car from '../db/car.json' with { type: 'json' };
import {
  BODY_TYPES_KEY,
  CAR_MAKES_KEY,
  CAR_MODELS_KEY,
  CAR_TYPES_KEY,
  COLORS_KEY,
  FUEL_TYPES_KEY,
  GEARBOX_TYPES_KEY,
} from '../constants/car.js';

const carSelect = (key, object = car) => {
  const values = [];

  if (key in object) {
    values.push(object[key]);
  }

  for (const array of Object.values(object).filter(Array.isArray)) {
    array.forEach((child) => values.push(carSelect(key, child)));
  }

  return values.flat();
};

export const CAR_TYPES = carSelect(CAR_TYPES_KEY);
export const CAR_MAKES = carSelect(CAR_MAKES_KEY);
export const CAR_MODELS = carSelect(CAR_MODELS_KEY);
export const BODY_TYPES = carSelect(BODY_TYPES_KEY);
export const FUEL_TYPES = carSelect(FUEL_TYPES_KEY);
export const GEARBOX_TYPES = carSelect(GEARBOX_TYPES_KEY);
export const COLORS = carSelect(COLORS_KEY);

export const mapCarItemsIds = (items) => {
  return items.map((item) => item.id);
};

export const extractCarItemById = (items, id) => {
  return items.find((item) => item.id === id) || null;
};
