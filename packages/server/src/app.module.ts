import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles';
import { MongoModule } from './config';

@Module({
  imports: [MongoModule, ArticlesModule],
})
export class AppModule {}
