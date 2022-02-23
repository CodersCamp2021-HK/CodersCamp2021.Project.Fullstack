import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantsController } from './api';
import { Restaurant, RestaurantSchema } from './database';
import { RestaurantsFacade } from './infra';

@Module({
  imports: [MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])],
  providers: [RestaurantsFacade],
  controllers: [RestaurantsController],
  exports: [RestaurantsFacade],
})
class RestaurantsModule {}

export { RestaurantsModule };
