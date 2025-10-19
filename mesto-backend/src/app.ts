import 'dotenv/config';

import express, { Request, Response } from 'express';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Сервер доступен!' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
