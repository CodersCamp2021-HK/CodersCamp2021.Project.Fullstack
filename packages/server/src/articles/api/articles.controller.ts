import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { CreateArticleCommand } from '../command';
import { GetArticleQuery, GetArticlesQuery } from '../query';
import { ArticleViewModel } from '../shared';
import { ArticleListDto } from './article-list.dto';
import { ArticleDto } from './article.dto';
import { CreateArticleDto } from './create-article.dto';

@ApiTags('articles')
@Controller('articles')
class ArticlesController {
  constructor(
    private readonly commandBus: CommandBus<CreateArticleCommand>,
    private readonly queryBus: QueryBus<GetArticlesQuery | GetArticleQuery>
    ) {}

  @Get()
  @ApiOkResponse({ type: ArticleListDto })
  async getAll() {
    const articles = await (this.queryBus.execute(new GetArticlesQuery()) as Promise<ArticleViewModel[]>);
    return plainToInstance(ArticleListDto, {  data: plainToInstance(ArticleDto, articles) });
  }

  @Get(":id")
  @ApiOkResponse({ type: ArticleDto })
  async findOne(@Param('id') id: string) {
    const article = await (this.queryBus.execute(new GetArticleQuery(id)) as Promise<ArticleViewModel>);
    if(!article) return null;
    return plainToInstance(ArticleDto, article);
  }

  @Post()
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ArticleDto, headers: { Location: { schema: { type: 'string' } } } })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArticleDto: CreateArticleDto, @Res({ passthrough: true }) resp: Response) {
    const command = plainToInstance(CreateArticleCommand, createArticleDto);
    const article =  await (this.commandBus.execute(command) as Promise<ArticleViewModel>);
    resp.setHeader('Location', `/${article.id}`);
    return plainToInstance(ArticleDto, article);
  }
}

export { ArticlesController };
