import appAssert from '../utils/appAssert.js';
import { createAdvert, getAdvertByIdAndUserId, updateAdvertById } from '../models/advert.js';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http.js';

export const initializeAdvert = async (userId, data) => {
  // Implement spam prevention system (multiple ads for same car)

  const advert = await createAdvert(userId, data);

  return { advert };
};

export const modifyAdvert = async (advertId, userId, data) => {
  const advert = await getAdvertByIdAndUserId(advertId, userId);
  appAssert(advert, NOT_FOUND, 'Invalid advertisement');

  // Implement checks for the document (can be editable? - time related)

  const { updated } = await updateAdvertById(advertId, data);
  appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to modify advertisement');
};
