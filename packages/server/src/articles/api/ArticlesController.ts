import { Body, Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import {
  ApiController,
  ApiCreate,
  ApiDelete,
  ApiGet,
  ApiList,
  ApiObjectIdParam,
  ApiUpdate,
  createPaginationLink,
  Pagination,
  PaginationQuery,
  Url,
} from '../../shared';
import {
  CreateArticleHandler,
  DeleteArticleHandler,
  GetArticleHandler,
  ListArticlesHandler,
  UpdateArticleHandler,
} from '../domain';
import { ArticleDto, CreateArticleDto, UpdateArticleDto } from './ArticleDto';
import { ArticleListDto } from './ArticleListDto';

@ApiController({ path: 'articles', name: 'Articles', description: 'Operations about articles' })
class ArticlesController {
  constructor(
    private readonly listArticlesHandler: ListArticlesHandler,
    private readonly getArticleHandler: GetArticleHandler,
    private readonly createArticleHandler: CreateArticleHandler,
    private readonly updateArticleHandler: UpdateArticleHandler,
    private readonly deleteArticleHandler: DeleteArticleHandler,
  ) {}

  @ApiObjectIdParam()
  @ApiGet({ name: 'article', response: ArticleDto })
  async findById(@Param('id') id: string) {
    const article = await this.getArticleHandler.exec({ id });
    if (!article) return null;
    return plainToInstance(ArticleDto, article);
  }

  @ApiList({ name: 'articles', response: ArticleListDto, link: true })
  async list(@Pagination() pagination: PaginationQuery, @Res({ passthrough: true }) res: Response, @Url() url: URL) {
    const paginatedArticles = await this.listArticlesHandler.exec(pagination);
    res.setHeader('Link', createPaginationLink(url, paginatedArticles.pages));
    return plainToInstance(ArticleListDto, paginatedArticles);
  }

  @ApiCreate({ name: 'article', response: ArticleDto })
  async create(@Body() createArticleDto: CreateArticleDto, @Res({ passthrough: true }) res: Response, @Url() url: URL) {
    const article = await this.createArticleHandler.exec(createArticleDto);
    res.setHeader('Location', `${url.href}/${article.id}`);
    return plainToInstance(ArticleDto, article);
  }

  @ApiObjectIdParam()
  @ApiUpdate({ name: 'article' })
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.updateArticleHandler.exec({ id, ...updateArticleDto });
  }

  @ApiObjectIdParam()
  @ApiDelete({ name: 'article' })
  async deleteOne(@Param('id') id: string) {
    return this.deleteArticleHandler.exec({ id });
  }
}

export { ArticlesController };