import { Module } from '@nestjs/common';

import { FavouriteDishListController, FavouriteRestaurantListController } from './favourites/api';

@Module({
  controllers: [FavouriteRestaurantListController, FavouriteDishListController],
})
class UsersModule {}

export { UsersModule };
