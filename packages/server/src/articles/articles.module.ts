import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';

@Module({
  controllers: [ArticlesController],
})
class ArticlesModule { }

export { ArticlesModule };
