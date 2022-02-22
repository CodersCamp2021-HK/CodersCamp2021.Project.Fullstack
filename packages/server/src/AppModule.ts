import { Module } from '@nestjs/common';

import { ArticlesModule } from './articles';
import {
  ExceptionFiltersModule,
  MongoModule,
  OpenApiValidationModule,
  ResponseInterceptorModule,
  ServeClientModule,
} from './config';
import { UsersModule } from './users';

const featureModules = [ArticlesModule, UsersModule];
const configModules = [
  ExceptionFiltersModule,
  OpenApiValidationModule,
  MongoModule,
  ResponseInterceptorModule,
  ServeClientModule,
];
@Module({
  imports: [...featureModules, ...configModules],
})
export class AppModule {}
