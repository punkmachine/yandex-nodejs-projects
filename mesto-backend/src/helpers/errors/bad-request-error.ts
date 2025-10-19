import { STATUS_BAD_REQUEST } from '../constants/statusCodes';

class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_BAD_REQUEST;
    this.name = 'BadRequestError';
  }
}

export default BadRequestError;
