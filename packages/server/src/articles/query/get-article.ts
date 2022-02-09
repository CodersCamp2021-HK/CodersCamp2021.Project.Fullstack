import { Article, ArticleDocument } from '@fullstack/database';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleViewModel } from '../shared';

class GetArticleQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetArticleQuery)
class GetArticleQueryHandler implements IQueryHandler<GetArticleQuery, ArticleViewModel> {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async execute(query: GetArticleQuery): Promise<ArticleViewModel> {
    const article = await this.articleModel.findById(query.id);
    if (!article) {
      return null;
    }

    return ArticleViewModel.from(article);
  }
}

export { GetArticleQueryHandler, GetArticleQuery };
