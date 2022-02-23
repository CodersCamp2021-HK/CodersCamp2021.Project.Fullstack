import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { DefaultResponseDto } from '../../shared';

@Catch()
class UnhandledExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    Logger.error(exception.message, exception.stack, UnhandledExceptionFilter.name);

    const body = plainToInstance(DefaultResponseDto, {
      name: 'Internal Server Error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      path: response.req.originalUrl,
    });

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
  }
}

export { UnhandledExceptionFilter };
