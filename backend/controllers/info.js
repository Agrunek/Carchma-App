import appAssert from '../utils/appAssert.js';
import { avoidField, findItemById, selectField } from '../utils/car.js';
import { CAR_MAKES_KEY, CAR_MODELS_KEY } from '../constants/car.js';
import { NOT_FOUND, OK } from '../constants/http.js';

const carInfo = avoidField(CAR_MODELS_KEY);
const carMakes = selectField(CAR_MAKES_KEY);

export const getCarInfoHandler = async (req, res) => {
  return res.status(OK).json(carInfo);
};

export const getCarMakeInfoHandler = async (req, res) => {
  const make = findItemById(carMakes, req.params.id);
  appAssert(make, NOT_FOUND, 'Car make not found');

  return res.status(OK).json(make);
};
