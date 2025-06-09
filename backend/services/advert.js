import appAssert from '../utils/appAssert.js';
import { createAdvert, getAdvertById, getAdverts, getAdvertsByUserId, updateAdvertById } from '../models/advert.js';
import { getImageCursorsByAdvertId } from '../models/image.js';
import { calculateInitialScore } from '../utils/reputation.js';
import { FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http.js';

export const initializeAdvert = async (userId, data) => {
  const previous = await getAdvertsByUserId(userId);
  const initialScore = calculateInitialScore(previous);

  const advert = await createAdvert(userId, data, initialScore);

  delete advert.initialScore;
  delete advert.score;

  advert.images = [];

  return { advert };
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

  const images = await getImageCursorsByAdvertId(advertId);

  delete advert.initialScore;
  delete advert.score;

  advert.images = images.map((image) => image._id);

  return { advert };
};

export const searchAdverts = async (page, query, options) => {
  const adverts = await getAdverts(page, query, options);

  return { adverts };
};
