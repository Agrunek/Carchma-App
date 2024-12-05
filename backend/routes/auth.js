import express from 'express';
import controllerWrapper from '../utils/controllerWrapper.js';
import { registerHandler } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', controllerWrapper(registerHandler));

export default router;
