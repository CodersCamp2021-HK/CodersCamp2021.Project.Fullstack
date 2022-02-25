import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { error } from 'express-openapi-validator';

import { ValidationErrorDto } from '../../shared';

interface ValidationError {
  status: number;
  message: string;
  errors: Array<{
    path: string;
    message: string;
    errorCode?: string;
  }>;
  path?: string;
  name: string;
  headers: {
    [header: string]: string;
  };
}

@Catch(...Object.values(error))
class OpenApiExceptionFilter implements ExceptionFilter {
  catch(error: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    Logger.debug({ ...error, path: response.req.originalUrl }, OpenApiExceptionFilter.name);

    const body = plainToInstance(ValidationErrorDto, { ...error, path: response.req.originalUrl });

    response.status(error.status).header(error.headers).json(body);
  }
}

export { OpenApiExceptionFilter };
