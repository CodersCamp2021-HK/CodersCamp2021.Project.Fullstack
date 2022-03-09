import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantController } from './api/RestaurantController';
import { Restaurant, RestaurantSchema } from './database';
import { DishController } from './dishes/api/DishController';
import { PartnerDishController } from './dishes/api/PartnerDishController';
import { RestaurantDishController } from './dishes/api/RestaurantDishController';
import { Dish, DishSchema } from './dishes/database';
import { CreateDishHandler, GetDishHandler, ListAllDishesHandler, ListPartnerDishesHandler } from './dishes/domain';
import { GetRestaurantHandler } from './domain/GetRestaurantHandler';
import { ListRestaurantsHandler } from './domain/ListRestaurantsHandler';
import { RestaurantsFacade } from './infra';
import { PartnerProfileController } from './profile/api/PartnerProfileController';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }]),
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
  ],
  controllers: [
    RestaurantController,
    PartnerProfileController,
    RestaurantDishController,
    PartnerDishController,
    DishController,
  ],
  providers: [
    RestaurantsFacade,
    ListRestaurantsHandler,
    GetRestaurantHandler,
    GetDishHandler,
    CreateDishHandler,
    ListAllDishesHandler,
    ListPartnerDishesHandler,
  ],
  exports: [RestaurantsFacade],
})
class RestaurantsModule {}

export { RestaurantsModule };
