import appAssert from '../utils/appAssert.js';
import {
  createImage,
  deleteImageById,
  getImageCursorArrayByAdvertId,
  getImageCursorArrayById,
  getImageDownloadStreamById,
} from '../models/image.js';
import { getAdvertById } from '../models/advert.js';
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND } from '../constants/http.js';

export const uploadImages = async (advertId, userId, images) => {
  const advert = await getAdvertById(advertId);
  appAssert(advert, NOT_FOUND, 'Advertisement not found');

  const { userId: ownerId } = advert;
  appAssert(userId.toString() === ownerId.toString(), FORBIDDEN, 'User is not the owner of the advertisement');

  const stored = await getImageCursorArrayByAdvertId(advertId);
  appAssert(stored.length + images.length <= 10, BAD_REQUEST, 'Total number of images exceeds maximum');

  for (const image of images) {
    await createImage(advertId, image);
  }
};

export const downloadImage = async (imageId) => {
  const stored = await getImageCursorArrayById(imageId);
  appAssert(stored.length > 0, NOT_FOUND, 'Image not found');

  const mimetype = stored.pop().metadata.mimetype;
  const downloadStream = await getImageDownloadStreamById(imageId);

  return { mimetype, downloadStream };
};

export const removeImage = async (imageId, userId) => {
  const stored = await getImageCursorArrayById(imageId);
  appAssert(stored.length > 0, NOT_FOUND, 'Image not found');

  const { advertId } = stored.pop().metadata;
  const advert = await getAdvertById(advertId);

  const { userId: ownerId } = advert;
  appAssert(userId.toString() === ownerId.toString(), FORBIDDEN, 'User is not the owner of the image');

  await deleteImageById(imageId);
};
