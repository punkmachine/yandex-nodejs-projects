import { STATUS_UNAUTHORIZED } from '../constants/statusCodes';

class UnauthorizedError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_UNAUTHORIZED;
    this.name = 'UnauthorizedError';
  }
}

export default UnauthorizedError;
