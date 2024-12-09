import express from 'express';
import controllerWrapper from '../utils/controllerWrapper.js';
import {
  emailVerificationHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/register', controllerWrapper(registerHandler));
router.post('/login', controllerWrapper(loginHandler));
router.post('/refresh', controllerWrapper(refreshHandler));
router.post('/logout', controllerWrapper(logoutHandler));
router.post('/verify-email/:code', controllerWrapper(emailVerificationHandler));

export default router;
