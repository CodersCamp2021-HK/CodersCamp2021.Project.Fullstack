import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Restaurant, RestaurantSchema } from './database';
import { PartnerDishController } from './dishes/api/PartnerDishController';
import { RestaurantDishController } from './dishes/api/RestaurantDishController';
import { RestaurantsFacade } from './infra';

@Module({
  imports: [MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])],
  controllers: [RestaurantDishController, PartnerDishController],
  providers: [RestaurantsFacade],
  exports: [RestaurantsFacade],
})
class RestaurantsModule {}

export { RestaurantsModule };
