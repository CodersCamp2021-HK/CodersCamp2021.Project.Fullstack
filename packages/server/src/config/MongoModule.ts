import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';

import { DefaultResponseDto } from '../shared';
import { env } from './Env';

@Catch(MongoError, MongooseError)
class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError | MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    Logger.error(exception.message, exception.stack, MongoExceptionFilter.name);

    const body = plainToInstance(DefaultResponseDto, {
      name: 'Internal Server Error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      path: response.req.originalUrl,
    });

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
  }
}

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_URL, {
      authSource: 'admin',
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
  ],
})
class MongoModule {}

export { MongoModule };
