import { advertSchema } from '../schemas/advert.js';
import { initializeAdvert } from '../services/advert.js';
import { CREATED } from '../constants/http.js';

export const postAdvertHandler = async (req, res) => {
  const { userId, ...data } = advertSchema.parse({ ...req.body, userId: req.userId });

  const { advert } = await initializeAdvert(userId, data);

  return res.status(CREATED).json(advert);
};
