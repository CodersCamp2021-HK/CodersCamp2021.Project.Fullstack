import { Module } from '@nestjs/common';

import { UsersController } from './api'
import { FavouriteDishListController, FavouriteRestaurantListController } from './favourites/api';


@Module({
  controllers: [FavouriteRestaurantListController, FavouriteDishListController, UsersController],
})
class UsersModule {}

export { UsersModule };

