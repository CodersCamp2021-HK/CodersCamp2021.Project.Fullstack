import { INestApplicationContext } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { NestFactory } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { AppModule } from '../../src/AppModule';
import { Article, ArticleDocument } from '../../src/articles/database';
import { Dish, DishDocument } from '../../src/restaurants/database';

class DatabaseProxy {
  private app: INestApplicationContext;

  constructor(private readonly nestOptions: NestApplicationContextOptions = { logger: false }) {}

  async init() {
    this.app = await NestFactory.createApplicationContext(AppModule, this.nestOptions);
    await this.app.init();
  }

  async close() {
    await this.app.close();
  }

  get articleModel() {
    return this.app.get<Model<ArticleDocument>>(getModelToken(Article.name));
  }

  get dishModel() {
    return this.app.get<Model<DishDocument>>(getModelToken(Dish.name));
  }

  get connection() {
    return this.app.get<Connection>(getConnectionToken());
  }
}

export { DatabaseProxy };
