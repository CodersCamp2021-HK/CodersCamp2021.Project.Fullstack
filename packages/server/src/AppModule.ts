import { Module } from '@nestjs/common';

import { ArticlesModule } from './articles';
import {
  ExceptionFiltersModule,
  MongoModule,
  OpenApiValidationModule,
  ResponseInterceptorModule,
  ServeClientModule,
} from './config';

const featureModules = [ArticlesModule];
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
