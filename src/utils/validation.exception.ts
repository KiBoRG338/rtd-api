
import { HttpException } from '@nestjs/common';

export class ForbiddenException extends HttpException {
    constructor(data) {
      super({ status: 427, message: 'Validations Errors', errors: data }, 427);
    }
  }