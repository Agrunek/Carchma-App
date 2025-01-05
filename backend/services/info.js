import appAssert from '../utils/appAssert.js';
import { avoidField, findItemById, selectField } from '../utils/car.js';
import { CAR_MAKES_KEY, CAR_MODELS_KEY } from '../constants/car.js';
import { NOT_FOUND } from '../constants/http.js';

const basicCarInfo = avoidField(CAR_MODELS_KEY);
const carMakes = selectField(CAR_MAKES_KEY);

export const filterBasicCarInfo = async () => {
  return { info: basicCarInfo };
};

export const filterCarMakeInfo = async (makeId) => {
  const make = findItemById(carMakes, makeId);
  appAssert(make, NOT_FOUND, 'Car make not found');

  return { info: make };
};
