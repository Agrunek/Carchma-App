import { createSchema, searchSchema } from '../schemas/report.js';
import { listReports, reportAdvert, reportComment } from '../services/report.js';
import { CREATED, OK } from '../constants/http.js';

export const postAdvertReportHandler = async (req, res) => {
  const { id, userId, content } = createSchema.parse({ ...req.body, userId: req.userId, id: req.params.id });

  const { report } = await reportAdvert(id, userId, content);

  return res.status(CREATED).json(report);
};

export const postCommentReportHandler = async (req, res) => {
  const { id, userId, content } = createSchema.parse({ ...req.body, userId: req.userId, id: req.params.id });

  const { report } = await reportComment(id, userId, content);

  return res.status(CREATED).json(report);
};

export const getReportsHandler = async (req, res) => {
  const { userId, page } = searchSchema.parse({ ...req.query, userId: req.userId });

  const { reports } = await listReports(userId, page);

  return res.status(OK).json(reports);
};
