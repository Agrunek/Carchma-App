import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import advert from './routes/advert.js';
import auth from './routes/auth.js';
import comment from './routes/comment.js';
import image from './routes/image.js';
import info from './routes/info.js';
import report from './routes/report.js';
import user from './routes/user.js';
import errorHandler from './middleware/errorHandler.js';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use('/advert', advert);
app.use('/auth', auth);
app.use('/comment', comment);
app.use('/image', image);
app.use('/info', info);
app.use('/report', report);
app.use('/user', user);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
});
