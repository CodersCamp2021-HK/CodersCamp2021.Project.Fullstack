import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantController } from './api/RestaurantController';
import { Dish, DishSchema, Restaurant, RestaurantSchema } from './database';
import { PartnerDishController } from './dishes/api/PartnerDishController';
import { RestaurantDishController } from './dishes/api/RestaurantDishController';
import { ListDishesHandler } from './dishes/domain/ListDishesHandler';
import { GetRestaurantHandler } from './domain/GetRestaurantHandler';
import { ListRestaurantsHandler } from './domain/ListRestaurantsHandler';
import { RestaurantsFacade } from './infra';
import { PartnerProfileController } from './profile/api/PartnerProfileController';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: Dish.name, schema: DishSchema },
    ]),
  ],
  controllers: [RestaurantController, PartnerProfileController, RestaurantDishController, PartnerDishController],
  providers: [RestaurantsFacade, GetRestaurantHandler, ListRestaurantsHandler, ListDishesHandler],
  exports: [RestaurantsFacade],
})
class RestaurantsModule {}

export { RestaurantsModule };
