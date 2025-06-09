import express from 'express';
import authHandler from '../middleware/authHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import { getReportsHandler, postAdvertReportHandler, postCommentReportHandler } from '../controllers/report.js';

const router = express.Router();

router.post('/advert/:id', authHandler, controllerWrapper(postAdvertReportHandler));
router.post('/comment/:id', authHandler, controllerWrapper(postCommentReportHandler));
router.get('/', authHandler, controllerWrapper(getReportsHandler));

export default router;
