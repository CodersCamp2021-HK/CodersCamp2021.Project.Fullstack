import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Article, ArticleDocument } from '../database';

interface GetArticleRequest {
  readonly id: string;
}

class GetArticleHandler implements Handler<GetArticleRequest, Article | null> {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async exec(req: GetArticleRequest): Promise<Article | null> {
    const article = await this.articleModel.findById(req.id);
    if (!article) return null;
    return plainToInstance(Article, article);
  }
}

export { GetArticleHandler };
