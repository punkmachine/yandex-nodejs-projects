import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import userRouter from './routes/user';
import { requestLogger, errorLogger } from './middlewares/logger';

const { DB_NAME, DB_HOST, DB_PORT, PORT = 3000 } = process.env;

if (!DB_NAME || !DB_HOST || !DB_PORT) {
  process.exit(1);
}

const MONGO_URL = `${DB_HOST}${DB_PORT}/${DB_NAME}`;

const app = express();

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Успешное подключение к MongoDB');
  })
  .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error.message);
    console.error('Убедитесь, что MongoDB запущен и доступен по адресу:', MONGO_URL);
    process.exit(1);
  });

app.use(requestLogger);

app.use(express.json());
app.use(helmet());

// Временное решение авторизации
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.user = {
    _id: '68f486669ad1e5c719525d0b'
  };

  next();
});

app.use('/users', userRouter);

app.use(errorLogger);

app.use(errors());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });

  next();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});