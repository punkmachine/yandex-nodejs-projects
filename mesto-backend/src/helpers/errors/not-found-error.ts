import { STATUS_NOT_FOUND } from '../constants/statusCodes';

class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_NOT_FOUND;
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
