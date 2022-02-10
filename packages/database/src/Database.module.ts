import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Article, ArticleSchema } from './models';

const imports = [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])];

@Global()
@Module({
  imports,
  exports: imports,
})
export class DatabaseModule {}
