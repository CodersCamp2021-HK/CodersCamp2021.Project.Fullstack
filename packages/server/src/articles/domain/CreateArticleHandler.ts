import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Article, ArticleDocument } from '../database';

interface CreateArticleRequest {
  readonly title: string;
  readonly content: string;
}

@Injectable()
class CreateArticleHandler implements Handler<CreateArticleRequest, Article> {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async exec(req: CreateArticleRequest): Promise<Article> {
    const created = await this.articleModel.create({ ...req });
    return plainToInstance(Article, created);
  }
}

export { CreateArticleHandler };
