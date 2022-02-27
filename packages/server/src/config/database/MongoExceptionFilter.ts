import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';

import { DefaultResponseDto } from '../../shared';

@Catch(MongoError, MongooseError)
class MongoExceptionFilter implements ExceptionFilter {
  handleUniqueKeyException(exception: MongoError, res: Response) {
    let message: string | undefined = undefined;
    if ('keyPattern' in exception) {
      const keys = Object.keys(exception['keyPattern']).join(',');
      message = `Unique key constraint violated for (${keys}) keys`;
    }

    const body = plainToInstance(DefaultResponseDto, {
      name: 'Unique key conflict',
      status: HttpStatus.CONFLICT.toString(),
      path: res.req.originalUrl,
      message: message,
    });
    res.status(HttpStatus.CONFLICT).json(body);
  }

  catch(exception: MongoError | MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    Logger.warn(exception.message, exception.stack, MongoExceptionFilter.name);

    if (exception instanceof MongoError) {
      if (exception.code === 11000) {
        this.handleUniqueKeyException(exception, res);
        return;
      }
    }

    const body = plainToInstance(DefaultResponseDto, {
      name: 'Internal Server Error',
      status: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
      path: res.req.originalUrl,
    });

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
  }
}

export { MongoExceptionFilter };
