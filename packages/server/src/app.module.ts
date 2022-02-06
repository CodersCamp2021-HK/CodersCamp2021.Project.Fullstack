import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongoModule } from './config';

@Module({
  imports: [MongoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
