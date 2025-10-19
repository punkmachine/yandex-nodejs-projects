import 'dotenv/config';

import express, { Request, Response } from 'express';
import helmet from 'helmet';
// import celebrate from 'celebrate';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Сервер доступен!' });
});

// тут надо подключить логгер ошибок из мидлварок на winston

// обработчик ошибок валидации запросов
// app.use(celebrate.errors());

// тут надо подключить кастомный обработчик ошибок 500

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
