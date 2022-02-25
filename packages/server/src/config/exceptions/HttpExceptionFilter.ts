import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import _ from 'lodash';

import { DefaultResponseDto } from '../../shared';

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
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
          status: status.toString(),
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

export { HttpExceptionFilter };
