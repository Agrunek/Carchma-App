import { advertSchema } from '../schemas/advert.js';
import { CREATED } from '../constants/http.js';

export const postAdvertHandler = async (req, res) => {
  const data = advertSchema.parse({ ...req.body, userId: req.userId });

  // Process request...

  return res.status(CREATED).json(data);
};
