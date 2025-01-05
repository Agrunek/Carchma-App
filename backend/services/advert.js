import appAssert from '../utils/appAssert.js';
import { createAdvert, getAdvertById, updateAdvertById } from '../models/advert.js';
import { getImageCursorArrayByAdvertId } from '../models/image.js';
import { extractPrimitives, findItemById, selectField } from '../utils/car.js';
import { FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http.js';
import {
  BODY_TYPES_KEY,
  CAR_MAKES_KEY,
  CAR_MODELS_KEY,
  CAR_TYPES_KEY,
  COLORS_KEY,
  FUEL_TYPES_KEY,
  GEARBOX_TYPES_KEY,
} from '../constants/car.js';

/*
  There is need for more advanced logic.
  User should be able to delete advert as long as it is not published for more than a day.
  Moreover admin should be able to do it as well.
  There should be one advert for car only, but it isn't as simple as blocking the vin.
  Someone different could sell the bought car and everything get problematic from a system standpoint.
*/

const carTypes = selectField(CAR_TYPES_KEY);
const carMakes = selectField(CAR_MAKES_KEY);
const carModels = selectField(CAR_MODELS_KEY);
const fuelTypes = selectField(FUEL_TYPES_KEY);
const gearboxTypes = selectField(GEARBOX_TYPES_KEY);
const bodyTypes = selectField(BODY_TYPES_KEY);
const colors = selectField(COLORS_KEY);

const translateAdvert = (advert, images) => {
  delete advert.updatedAt;
  delete advert.createdAt;

  advert.type = extractPrimitives(findItemById(carTypes, advert.type));
  advert.make = extractPrimitives(findItemById(carMakes, advert.make));
  advert.model = extractPrimitives(findItemById(carModels, advert.model));
  advert.fuel = extractPrimitives(findItemById(fuelTypes, advert.fuel));
  advert.gearbox = extractPrimitives(findItemById(gearboxTypes, advert.gearbox));
  advert.body = extractPrimitives(findItemById(bodyTypes, advert.body));
  advert.color = extractPrimitives(findItemById(colors, advert.color));

  advert.images = images?.map((image) => image._id) || [];

  return advert;
};

export const initializeAdvert = async (userId, data) => {
  const advert = await createAdvert(userId, data);

  return { advert: translateAdvert(advert) };
};

export const modifyAdvert = async (advertId, userId, data) => {
  const advert = await getAdvertById(advertId);
  appAssert(advert, NOT_FOUND, 'Advertisement not found');

  const { userId: ownerId } = advert;
  appAssert(userId.toString() === ownerId.toString(), FORBIDDEN, 'User is not the owner of the advertisement');

  const { updated } = await updateAdvertById(advertId, data);
  appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to modify advertisement');
};

export const showAdvert = async (advertId) => {
  const advert = await getAdvertById(advertId);
  appAssert(advert, NOT_FOUND, 'Advertisement not found');

  const images = await getImageCursorArrayByAdvertId(advertId);

  return { advert: translateAdvert(advert, images) };
};
