import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { NullInterceptor, UndefinedInterceptor } from './api';
import { MongoExceptionFilter, MongoModule } from './database';
import { env } from './Env';
import { HttpExceptionFilter, OpenApiExceptionFilter, UnhandledExceptionFilter } from './exceptions';
import { SecurityModule } from './SecurityModule';
import { ServeClientModule } from './ServeClientModule';

const devConfigModules = [MongoModule];
const prodConfigModules = [ServeClientModule, SecurityModule];
const configModules = [...devConfigModules, ...(env.NODE_ENV === 'production' ? prodConfigModules : [])];
const expectionFilters = [
  UnhandledExceptionFilter,
  HttpExceptionFilter,
  MongoExceptionFilter,
  OpenApiExceptionFilter,
].map((ExceptionFilter) => ({
  provide: APP_FILTER,
  useClass: ExceptionFilter,
}));
const interceptors = [NullInterceptor, UndefinedInterceptor].map((Interceptor) => ({
  provide: APP_INTERCEPTOR,
  useClass: Interceptor,
}));

@Module({
  imports: [...configModules],
  providers: [...expectionFilters, ...interceptors],
})
class AppConfigModule {}

export { AppConfigModule };
