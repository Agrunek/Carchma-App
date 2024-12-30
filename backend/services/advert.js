import { createAdvert } from '../models/advert.js';

export const initializeAdvert = async (userId, data) => {
  const advert = await createAdvert(userId, data);

  return { advert };
};
