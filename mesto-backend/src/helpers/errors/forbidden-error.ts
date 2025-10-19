import { STATUS_FORBIDDEN } from '../constants/statusCodes';

class ForbiddenError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_FORBIDDEN;
    this.name = 'ForbiddenError';
  }
}

export default ForbiddenError;
