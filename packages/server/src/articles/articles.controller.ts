import { Article, ArticleDocument } from '@fullstack/database';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

class CreateArticleDto {
  title: string;
  content: string;
}

@Controller('articles')
class ArticlesController {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  @Get() 
  getArticles() {
    return this.articleModel.find();
  }

  @Get(":id") 
  getArticle(@Param('id') id: string) {
    return this.articleModel.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    const article = await this.articleModel.create(createArticleDto);
    return { id: article._id }; 
  }
}

export { ArticlesController };
