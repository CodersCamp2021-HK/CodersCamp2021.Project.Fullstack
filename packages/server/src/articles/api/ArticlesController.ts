import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { CreateArticleHandler, GetArticleHandler, GetArticlesHandler } from '../domain';
import { ArticleDto, CreateArticleDto } from './ArticleDto';
import { ArticleListDto } from './ArticleListDto';

@ApiTags('articles')
@Controller('articles')
class ArticlesController {
  constructor(
    private readonly createArticleHandler: CreateArticleHandler,
    private readonly getArticleHandler: GetArticleHandler,
    private readonly getArticlesHandler: GetArticlesHandler,
  ) {}

  @Get()
  @ApiOkResponse({ type: ArticleListDto })
  async getAll() {
    const articles = await this.getArticlesHandler.exec();
    return plainToInstance(ArticleListDto, { data: plainToInstance(ArticleDto, articles) });
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleDto })
  async findOne(@Param('id') id: string) {
    const article = await this.getArticleHandler.exec({ id });
    if (!article) return null;
    return plainToInstance(ArticleDto, article);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ArticleDto,
    headers: { Location: { schema: { type: 'string' } } },
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArticleDto: CreateArticleDto, @Res({ passthrough: true }) resp: Response) {
    const article = await this.createArticleHandler.exec(createArticleDto);
    resp.setHeader('Location', `/${article.id}`);
    return plainToInstance(ArticleDto, article);
  }
}

export { ArticlesController };
