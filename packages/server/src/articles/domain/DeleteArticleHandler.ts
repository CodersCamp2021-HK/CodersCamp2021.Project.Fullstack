import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IHandler } from '../../shared';
import { Article, ArticleDocument } from '../database';

interface DeleteArticleRequest {
  readonly id: string;
}

@Injectable()
class DeleteArticleHandler implements IHandler<DeleteArticleRequest, null | undefined> {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async exec(req: DeleteArticleRequest): Promise<null | undefined> {
    const result = await this.articleModel.deleteOne({ _id: req.id });
    if (result.deletedCount !== 1) return null;
    return undefined;
  }
}

export { DeleteArticleHandler };
