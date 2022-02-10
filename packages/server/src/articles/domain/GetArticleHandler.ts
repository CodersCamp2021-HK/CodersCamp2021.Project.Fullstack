import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { IHandler } from '../../shared';
import { Article, ArticleDocument } from '../database';

interface GetArticleRequest {
  readonly id: string;
}

class GetArticleHandler implements IHandler<GetArticleRequest, Article> {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async exec(req: GetArticleRequest): Promise<Article> {
    const article = await this.articleModel.findById(req.id);
    return plainToInstance(Article, article);
  }
}

export { GetArticleHandler };
