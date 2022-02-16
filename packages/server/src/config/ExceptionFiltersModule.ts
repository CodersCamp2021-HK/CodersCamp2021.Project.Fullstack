import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import _ from 'lodash';

import { DefaultResponseDto } from '../shared';

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

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionBody = exception.getResponse();
    Logger.debug({ ...exception, path: request.originalUrl }, exception.stack, HttpExceptionFilter.name);

    const body = plainToInstance(
      DefaultResponseDto,
      _.defaults(
        {
          name: getReasonPhrase(status),
          status: status,
          path: request.originalUrl,
        },
        _.isString(exceptionBody)
          ? {
              message: exceptionBody,
            }
          : {
              ...exceptionBody,
            },
      ),
    );

    response.status(status).json(body);
  }
}

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: UnhandledExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
class ExceptionFiltersModule {}

export { ExceptionFiltersModule };
