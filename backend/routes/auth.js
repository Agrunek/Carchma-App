import express from 'express';
import controllerWrapper from '../utils/controllerWrapper.js';
import { loginHandler, registerHandler } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', controllerWrapper(registerHandler));
router.post('/login', controllerWrapper(loginHandler));

export default router;
