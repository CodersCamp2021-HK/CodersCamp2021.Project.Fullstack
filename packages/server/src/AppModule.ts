import { Module } from '@nestjs/common';

import { ArticlesModule } from './articles';
import { AuthModule } from './auth';
import {
  ExceptionFiltersModule,
  MongoModule,
  OpenApiValidationModule,
  ResponseInterceptorModule,
  ServeClientModule,
} from './config';
import { RestaurantsModule } from './restaurants';
import { UsersModule } from './users';

const featureModules = [ArticlesModule, AuthModule, RestaurantsModule, UsersModule];
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
