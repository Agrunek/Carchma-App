import { getAdvertsSchema, patchAdvertSchema, postAdvertSchema } from '../schemas/advert.js';
import { initializeAdvert, modifyAdvert, searchAdverts, showAdvert } from '../services/advert.js';
import { CREATED, OK } from '../constants/http.js';

export const postAdvertHandler = async (req, res) => {
  const car = postAdvertSchema.parse(req.body);

  const { advert } = await initializeAdvert(req.userId, car);

  return res.status(CREATED).json(advert);
};

export const patchAdvertHandler = async (req, res) => {
  const changes = patchAdvertSchema.parse(req.body);

  await modifyAdvert(req.params.id, req.userId, changes);

  return res.status(OK).json({ message: 'Advertisement update successful' });
};

export const getAdvertHandler = async (req, res) => {
  const { advert } = await showAdvert(req.params.id);

  return res.status(OK).json(advert);
};

export const getAdvertsHandler = async (req, res) => {
  const { page, query, ...options } = getAdvertsSchema.parse(req.query);

  const { adverts } = await searchAdverts(page, query, options);

  return res.status(OK).json(adverts);
};
