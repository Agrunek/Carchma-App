import express from 'express';
import authHandler from '../middleware/authHandler.js';
import idHandler from '../middleware/idHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import { getReportsHandler, postAdvertReportHandler, postCommentReportHandler } from '../controllers/report.js';

const router = express.Router();

router.post('/advert/:id', authHandler, idHandler, controllerWrapper(postAdvertReportHandler));
router.post('/comment/:id', authHandler, idHandler, controllerWrapper(postCommentReportHandler));
router.get('/', authHandler, controllerWrapper(getReportsHandler));

export default router;
