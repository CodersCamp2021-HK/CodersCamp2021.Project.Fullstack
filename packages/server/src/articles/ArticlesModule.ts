import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesController } from './api';
import { Article, ArticleSchema } from './database';
import { CreateArticleHandler, GetArticleHandler, GetArticlesHandler } from './domain';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  controllers: [ArticlesController],
  providers: [CreateArticleHandler, GetArticleHandler, GetArticlesHandler],
})
class ArticlesModule {}

export { ArticlesModule };
