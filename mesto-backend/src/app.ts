import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import userRouter from './routes/user';
import cardRouter from './routes/card';
import { createUser, login } from './controllers/user';
import { createUserValidation, loginValidation } from './helpers/validations/userValidations';

import auth from './middlewares/auth';

import { requestLogger, errorLogger } from './middlewares/logger';
import { STATUS_CONFLICT, STATUS_INTERNAL_SERVER_ERROR } from './helpers/constants/statusCodes';

const {
  MONGO_URL,
  PORT = 3000,
} = process.env;

if (!MONGO_URL) {
  process.exit(1);
}

const app = express();

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Успешное подключение к MongoDB');
  })
  .catch(() => {
    process.exit(1);
  });

app.use(requestLogger);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Роуты для регистрации и авторизации
app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);

// Защита всех роутов авторизацией
app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger);

app.use(errors());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.code === 11000) {
    res.status(STATUS_CONFLICT).send({
      message: 'Пользователь с таким email уже существует',
    });

    return;
  }

  const { statusCode = STATUS_INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === STATUS_INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
