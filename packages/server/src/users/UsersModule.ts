import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantsModule } from '../restaurants';
import { UsersController } from './api';
import { User, UserSchema } from './database';
import { GetUserHandler } from './domain';
import { UpdateUserProfileHandler } from './domain/UpdateUserProfileHandler';
import { FavouriteDishListController, FavouriteRestaurantsController } from './favourites/api';
import {
  AddFavouriteRestaurantHandler,
  ListFavouriteRestaurantsHandler,
  RemoveFavouriteRestaurantHandler,
} from './favourites/domain';
import { UsersFacade } from './infra';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), RestaurantsModule],
  controllers: [FavouriteRestaurantsController, FavouriteDishListController, UsersController],
  providers: [
    UsersFacade,
    GetUserHandler,
    UpdateUserProfileHandler,
    AddFavouriteRestaurantHandler,
    ListFavouriteRestaurantsHandler,
    RemoveFavouriteRestaurantHandler,
  ],
  exports: [UsersFacade],
})
class UsersModule {}

export { UsersModule };
