import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesController } from './api';
import { Article, ArticleSchema } from './database';
import {
  CreateArticleHandler,
  DeleteArticleHandler,
  GetArticleHandler,
  ListArticlesHandler,
  UpdateArticleHandler,
} from './domain';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  controllers: [ArticlesController],
  providers: [GetArticleHandler, ListArticlesHandler, CreateArticleHandler, UpdateArticleHandler, DeleteArticleHandler],
})
class ArticlesModule {}

export { ArticlesModule };
