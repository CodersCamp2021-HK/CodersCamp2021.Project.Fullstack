import { ArgumentsHost, Catch, ExceptionFilter, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { error } from 'express-openapi-validator';
import { join } from 'path';

import { ValidationErrorDto } from '../shared';
import { env } from './Env';

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

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: OpenApiExceptionFilter,
    },
  ],
})
class OpenApiValidationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ...OpenApiValidator.middleware({
          apiSpec: join(__dirname, '..', 'api.spec.json'),
          validateRequests: {
            allowUnknownQueryParameters: true,
            coerceTypes: false,
          },
          validateResponses: env.NODE_ENV !== 'production',
          validateFormats: 'full',
        }),
      )
      .forRoutes('*');
  }
}

export { OpenApiValidationModule };
