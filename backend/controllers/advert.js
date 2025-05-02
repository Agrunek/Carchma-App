import { advertSchema, createSchema, searchSchema, updateSchema } from '../schemas/advert.js';
import { initializeAdvert, modifyAdvert, searchAdverts, showAdvert } from '../services/advert.js';
import { CREATED, OK } from '../constants/http.js';

export const postAdvertHandler = async (req, res) => {
  const { userId, ...data } = createSchema.parse({ ...req.body, userId: req.userId });

  const { advert } = await initializeAdvert(userId, data);

  return res.status(CREATED).json(advert);
};

export const patchAdvertHandler = async (req, res) => {
  const { advertId, userId, ...data } = updateSchema.parse({
    ...req.body,
    userId: req.userId,
    advertId: req.params.id,
  });

  await modifyAdvert(advertId, userId, data);

  return res.status(OK).json({ message: 'Advertisement update successful' });
};

export const getAdvertHandler = async (req, res) => {
  const { advertId } = advertSchema.parse({ advertId: req.params.id });

  const { advert } = await showAdvert(advertId);

  return res.status(OK).json(advert);
};

export const getAdvertsHandler = async (req, res) => {
  const { page, q, ...filterOptions } = searchSchema.parse({ ...req.query });

  const { adverts } = await searchAdverts(page, q, filterOptions);

  return res.status(OK).json(adverts);
};
