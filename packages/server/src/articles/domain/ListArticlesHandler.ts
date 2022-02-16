import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler, Paginated, PaginationQuery } from '../../shared';
import { Article, ArticleDocument } from '../database';

class ListArticlesHandler implements Handler<PaginationQuery, Paginated<Article>> {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async exec(req: PaginationQuery): Promise<Paginated<Article>> {
    const offset = (req.page - 1) * req.limit;
    const articlesDocsQuery = this.articleModel.find().skip(offset).limit(req.limit);
    const countQuery = this.articleModel.countDocuments();
    const [articlesDocs, count] = await Promise.all([articlesDocsQuery.exec(), countQuery.exec()]);
    return { data: plainToInstance(Article, articlesDocs), pages: Math.ceil(count / req.limit) };
  }
}

export { ListArticlesHandler };
