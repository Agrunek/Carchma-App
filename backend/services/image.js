import appAssert from '../utils/appAssert.js';
import { createImage, getImageCursorArrayById, getImageDownloadStreamById } from '../models/image.js';
import { getAdvertByIdAndUserId } from '../models/advert.js';
import { NOT_FOUND } from '../constants/http.js';

export const uploadImages = async (advertId, userId, images) => {
  const advert = await getAdvertByIdAndUserId(advertId, userId);
  appAssert(advert, NOT_FOUND, 'Invalid advertisement');

  // Safe checks for total images length (existing + new)

  for (const image of images) {
    await createImage(advertId, image);
  }
};

export const downloadImage = async (imageId) => {
  const array = await getImageCursorArrayById(imageId);
  appAssert(array.length > 0, NOT_FOUND, 'Image not found');

  const mimetype = array.pop().metadata.mimetype;
  const downloadStream = await getImageDownloadStreamById(imageId);

  return { mimetype, downloadStream };
};
