import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantsModule } from '../restaurants';
import { UsersController } from './api';
import { User, UserSchema } from './database';
import { GetUserHandler } from './domain';
import { UpdateUserProfileHandler } from './domain/UpdateUserProfileHandler';
import { FavouriteDishesController, FavouriteRestaurantsController } from './favourites/api';
import {
  AddFavouriteDishHandler,
  AddFavouriteRestaurantHandler,
  ListFavouriteDishesHandler,
  ListFavouriteRestaurantsHandler,
  RemoveFavouriteDishHandler,
  RemoveFavouriteRestaurantHandler,
} from './favourites/domain';
import { UsersFacade } from './infra';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), RestaurantsModule],
  controllers: [FavouriteRestaurantsController, FavouriteDishesController, UsersController],
  providers: [
    UsersFacade,
    GetUserHandler,
    UpdateUserProfileHandler,
    AddFavouriteRestaurantHandler,
    ListFavouriteRestaurantsHandler,
    RemoveFavouriteRestaurantHandler,
    ListFavouriteDishesHandler,
    AddFavouriteDishHandler,
    RemoveFavouriteDishHandler,
  ],
  exports: [UsersFacade],
})
class UsersModule {}

export { UsersModule };
