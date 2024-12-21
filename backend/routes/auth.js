import express from 'express';
import controllerWrapper from '../utils/controllerWrapper.js';
import {
  emailVerificationHandler,
  forgotPasswordHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/register', controllerWrapper(registerHandler));
router.post('/login', controllerWrapper(loginHandler));
router.post('/refresh', controllerWrapper(refreshHandler));
router.post('/logout', controllerWrapper(logoutHandler));
router.post('/verify-email/:code', controllerWrapper(emailVerificationHandler));
router.post('/forgot-password', controllerWrapper(forgotPasswordHandler));
router.post('/reset-password', controllerWrapper(resetPasswordHandler));

export default router;
