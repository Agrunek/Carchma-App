import express from 'express';
import controllerWrapper from '../utils/controllerWrapper.js';
import { loginHandler, logoutHandler, registerHandler } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', controllerWrapper(registerHandler));
router.post('/login', controllerWrapper(loginHandler));
router.post('/logout', controllerWrapper(logoutHandler));

export default router;
