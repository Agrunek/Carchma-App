import { getReportsSchema, postReportSchema } from '../schemas/report.js';
import { listReports, reportAdvert, reportComment } from '../services/report.js';
import { CREATED, OK } from '../constants/http.js';

export const postAdvertReportHandler = async (req, res) => {
  const { content } = postReportSchema.parse(req.body);

  const { report } = await reportAdvert(req.params.id, req.userId, content);

  return res.status(CREATED).json(report);
};

export const postCommentReportHandler = async (req, res) => {
  const { content } = postReportSchema.parse(req.body);

  const { report } = await reportComment(req.params.id, req.userId, content);

  return res.status(CREATED).json(report);
};

export const getReportsHandler = async (req, res) => {
  const { page } = getReportsSchema.parse(req.query);

  const { reports } = await listReports(req.userId, page);

  return res.status(OK).json(reports);
};
