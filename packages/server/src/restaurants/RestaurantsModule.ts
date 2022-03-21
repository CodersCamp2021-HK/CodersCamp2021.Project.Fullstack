import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantController } from './api/RestaurantController';
import { Restaurant, RestaurantSchema } from './database';
import { DishController } from './dishes/api/DishController';
import { PartnerDishController } from './dishes/api/PartnerDishController';
import { RestaurantDishController } from './dishes/api/RestaurantDishController';
import { Dish, DishSchema } from './dishes/database';
import {
  CreateDishHandler,
  DeleteDishHandler,
  GetDishHandler,
  ListAllDishesHandler,
  ListPartnerDishesHandler,
  UpdateDishHandler,
} from './dishes/domain';
import { GetRestaurantHandler } from './domain/GetRestaurantHandler';
import { ListRestaurantsHandler } from './domain/ListRestaurantsHandler';
import { DishesFacade, RestaurantsFacade } from './infra';
import { PartnerProfileController } from './profile/api/PartnerProfileController';
import { UpdatePartnerProfileHandler } from './profile/domain';

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
    PartnerProfileController,
  ],
  providers: [
    RestaurantsFacade,
    DishesFacade,
    ListRestaurantsHandler,
    GetRestaurantHandler,
    GetDishHandler,
    CreateDishHandler,
    UpdateDishHandler,
    DeleteDishHandler,
    ListAllDishesHandler,
    ListPartnerDishesHandler,
    UpdatePartnerProfileHandler,
  ],
  exports: [RestaurantsFacade, DishesFacade],
})
class RestaurantsModule {}

export { RestaurantsModule };
