import appAssert from '../utils/appAssert.js';
import { createAdvertFirstStep, createAdvertSecondStep, getAdvertByIdAndUserId } from '../models/advert.js';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http.js';

export const prepareAdvertFirstStep = async (userId, data) => {
  // Implement spam prevention system (multiple ads for same car)

  const advert = await createAdvertFirstStep(userId, data);

  return { advert };
};

export const prepareAdvertSecondStep = async (advertId, userId, data) => {
  const advert = await getAdvertByIdAndUserId(advertId, userId);
  appAssert(advert, NOT_FOUND, 'Invalid advertisement');

  // Implement checks for the document

  const { updated } = await createAdvertSecondStep(advertId, data);
  appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to prepare advertisement');

  return { advert: { ...advert, ...data } };
};
