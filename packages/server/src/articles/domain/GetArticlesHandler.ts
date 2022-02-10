import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { IHandler } from '../../shared';
import { Article, ArticleDocument } from '../database';

class GetArticlesHandler implements IHandler<void, Article[]> {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async exec(): Promise<Article[]> {
    const articlesDocs = await this.articleModel.find();
    return plainToInstance(Article, articlesDocs);
  }
}

export { GetArticlesHandler };
