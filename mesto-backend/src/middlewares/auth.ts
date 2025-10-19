import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/express';
import UnauthorizedError from '../helpers/errors/unauthorized-error';

const { JWT_SECRET } = process.env;

interface JwtPayload {
  _id: string;
}

export default (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.jwt;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload: JwtPayload;

  try {
    payload = jwt.verify(token, JWT_SECRET!) as JwtPayload;
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  (req as AuthenticatedRequest).user = payload;

  next();
};
