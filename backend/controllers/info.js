import { makeSchema } from '../schemas/info.js';
import { filterBasicCarInfo, filterCarMakeInfo } from '../services/info.js';
import { OK } from '../constants/http.js';

export const carInfoHandler = async (req, res) => {
  const { info } = await filterBasicCarInfo();

  return res.status(OK).json(info);
};

export const carMakeInfoHandler = async (req, res) => {
  const { makeId } = makeSchema.parse({ makeId: req.params.id });

  const { info } = await filterCarMakeInfo(makeId);

  return res.status(OK).json(info);
};
