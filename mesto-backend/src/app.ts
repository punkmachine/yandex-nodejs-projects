import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
// import celebrate from 'celebrate';

import userRouter from './routes/user';

const { DB_NAME, DB_HOST, DB_PORT, PORT = 3000 } = process.env;
const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(helmet());

app.use('/users', userRouter);

// тут надо подключить логгер ошибок из мидлварок на winston

// обработчик ошибок валидации запросов
// app.use(celebrate.errors());

// тут надо подключить кастомный обработчик ошибок 500

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
