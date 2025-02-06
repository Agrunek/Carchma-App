import appAssert from '../utils/appAssert.js';
import { createAdvert, getAdvertById, getAdvertsByUserId, updateAdvertById } from '../models/advert.js';
import { getImageCursorArrayByAdvertId } from '../models/image.js';
import { calculateInitialScore } from '../utils/reputation.js';
import { FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http.js';

/*
  There is need for more advanced logic.
  User should be able to delete advert as long as it is not published for more than a day.
  Moreover admin should be able to do it as well.
  There should be one advert for car only, but it isn't as simple as blocking the vin.
  Someone different could sell the bought car and everything get problematic from a system standpoint.
*/

export const initializeAdvert = async (userId, data) => {
  const previous = await getAdvertsByUserId(userId);
  const initialScore = calculateInitialScore(previous);

  const advert = await createAdvert(userId, data, initialScore);

  delete advert.initialScore;
  delete advert.score;
  delete advert.createdAt;
  delete advert.updatedAt;

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

  const images = await getImageCursorArrayByAdvertId(advertId);

  delete advert.initialScore;
  delete advert.score;
  delete advert.createdAt;
  delete advert.updatedAt;

  advert.images = images.map((image) => image._id);

  return { advert };
};
