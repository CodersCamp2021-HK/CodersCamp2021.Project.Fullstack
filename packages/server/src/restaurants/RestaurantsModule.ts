import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { Address, AddressSchema } from '../addresses/database';
// import { CreateAddressHandler } from '../addresses/domain';
import { RestaurantController } from './api/RestaurantController';
import { Restaurant, RestaurantSchema } from './database';
import { DishController } from './dishes/api/DishController';
import { PartnerDishController } from './dishes/api/PartnerDishController';
import { RestaurantDishController } from './dishes/api/RestaurantDishController';
import { Dish, DishSchema } from './dishes/database';
import { CreateDishHandler, ListAllDishesHandler } from './dishes/domain';
import { GetRestaurantHandler } from './domain/GetRestaurantHandler';
import { ListRestaurantsHandler } from './domain/ListRestaurantsHandler';
import { RestaurantsFacade } from './infra';
import { PartnerProfileController } from './profile/api/PartnerProfileController';
import { UpdatePartnerProfileHandler } from './profile/domain';
import { Auth, AuthSchema } from '../auth/database';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }]),
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    // MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  controllers: [
    RestaurantController,
    PartnerProfileController,
    RestaurantDishController,
    PartnerDishController,
    DishController,
    PartnerProfileController,
  ],
  providers: [RestaurantsFacade, ListRestaurantsHandler, GetRestaurantHandler, CreateDishHandler, ListAllDishesHandler, UpdatePartnerProfileHandler],
  exports: [RestaurantsFacade],
})
class RestaurantsModule {}

export { RestaurantsModule };
