import { INestApplicationContext } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { NestFactory } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Address, AddressDocument } from '../../src/addresses/database';
import { AppModule } from '../../src/AppModule';
import { Article, ArticleDocument } from '../../src/articles/database';
import { Auth, AuthDocument } from '../../src/auth/database';
import { Restaurant, RestaurantDocument } from '../../src/restaurants/database';
import { User, UserDocument } from '../../src/users/database';

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

  get addressModel() {
    return this.app.get<Model<AddressDocument>>(getModelToken(Address.name));
  }

  get authModel() {
    return this.app.get<Model<AuthDocument>>(getModelToken(Auth.name));
  }

  get userModel() {
    return this.app.get<Model<UserDocument>>(getModelToken(User.name));
  }

  get restaurantModel() {
    return this.app.get<Model<RestaurantDocument>>(getModelToken(Restaurant.name));
  }

  get connection() {
    return this.app.get<Connection>(getConnectionToken());
  }
}

export { DatabaseProxy };
