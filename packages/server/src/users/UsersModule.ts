import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Dish, DishSchema } from '../restaurants/dishes/database';
import { UsersController } from './api';
import { User, UserSchema } from './database';
import { GetUserHandler } from './domain';
import { UpdateUserProfileHandler } from './domain/UpdateUserProfileHandler';
import { FavouriteDishesController, FavouriteRestaurantListController } from './favourites/api';
import { AddFavouriteDishHandler, ListFavouriteDishesHandler, RemoveFavouriteDishHandler } from './favourites/domain';
import { UsersFacade } from './infra';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
  ],
  controllers: [FavouriteRestaurantListController, FavouriteDishesController, UsersController],
  providers: [
    UsersFacade,
    GetUserHandler,
    UpdateUserProfileHandler,
    ListFavouriteDishesHandler,
    AddFavouriteDishHandler,
    RemoveFavouriteDishHandler,
  ],
  exports: [UsersFacade],
})
class UsersModule {}

export { UsersModule };
