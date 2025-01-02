import { createFirstStepSchema, createSecondStepSchema } from '../schemas/advert.js';
import { prepareAdvertFirstStep, prepareAdvertSecondStep } from '../services/advert.js';
import { CREATED } from '../constants/http.js';

export const postAdvertFirstStepHandler = async (req, res) => {
  const { userId, ...data } = createFirstStepSchema.parse({ ...req.body, userId: req.userId });

  const { advert } = await prepareAdvertFirstStep(userId, data);

  return res.status(CREATED).json(advert);
};

export const postAdvertSecondStepHandler = async (req, res) => {
  const { advertId, userId, ...data } = createSecondStepSchema.parse({
    ...req.body,
    userId: req.userId,
    advertId: req.params.id,
  });

  const { advert } = await prepareAdvertSecondStep(advertId, userId, data);

  return res.status(CREATED).json(advert);
};
