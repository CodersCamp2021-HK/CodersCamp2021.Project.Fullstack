import { Article, ArticleDocument } from '@fullstack/database';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleViewModel } from '../shared';

class GetArticlesQuery {}

@QueryHandler(GetArticlesQuery)
class GetArticlesQueryHandler implements IQueryHandler<GetArticlesQuery, ArticleViewModel[]> {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async execute(_: GetArticlesQuery): Promise<ArticleViewModel[]> {
    const articlesDocs = await this.articleModel.find();
    return articlesDocs.map(ArticleViewModel.from);
  }
}

export { GetArticlesQueryHandler, GetArticlesQuery };
