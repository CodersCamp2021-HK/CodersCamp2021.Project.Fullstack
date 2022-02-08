import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles';
import { MongoModule, ServeClientModule } from './config';

@Module({
  imports: [MongoModule, ServeClientModule, ArticlesModule],
})
export class AppModule {}
