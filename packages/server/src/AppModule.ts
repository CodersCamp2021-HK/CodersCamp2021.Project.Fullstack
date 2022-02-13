import { Module } from '@nestjs/common';

import { ArticlesModule } from './articles';
import { MongoModule, ServeClientModule } from './config';
import { OpenApiValidationModule } from './config/OpenApiValidationModule';

@Module({
  imports: [MongoModule, ServeClientModule, ArticlesModule, OpenApiValidationModule],
})
export class AppModule {}
