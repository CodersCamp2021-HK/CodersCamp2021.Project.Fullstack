import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantController } from './api/RestaurantController';
import { Restaurant, RestaurantSchema } from './database';
import { RestaurantsFacade } from './infra';

@Module({
  imports: [MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])],
  controllers: [RestaurantController],
  providers: [RestaurantsFacade],
  exports: [RestaurantsFacade],
})
class RestaurantsModule {}

export { RestaurantsModule };
