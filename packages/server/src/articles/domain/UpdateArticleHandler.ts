import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Article, ArticleDocument } from '../database';

interface UpdateArticleRequest {
  readonly id: string;
  readonly title: string;
  readonly content: string;
}

@Injectable()
class UpdateArticleHandler implements Handler<UpdateArticleRequest, null | undefined> {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async exec(req: UpdateArticleRequest): Promise<null | undefined> {
    const result = await this.articleModel.findOneAndUpdate(
      { _id: req.id },
      { title: req.title, content: req.content },
    );
    if (result === null) return null;
    return undefined;
  }
}

export { UpdateArticleHandler };
