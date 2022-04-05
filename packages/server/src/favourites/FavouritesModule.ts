import { Module } from '@nestjs/common';

import { RestaurantsModule } from '../restaurants';
import { UsersModule } from '../users';
import { FavouriteDishesController, FavouriteRestaurantsController } from './api';
import {
  AddFavouriteDishHandler,
  AddFavouriteRestaurantHandler,
  ListFavouriteDishesHandler,
  ListFavouriteRestaurantsHandler,
  RemoveFavouriteDishHandler,
  RemoveFavouriteRestaurantHandler,
} from './domain';

@Module({
  imports: [UsersModule, RestaurantsModule],
  controllers: [FavouriteRestaurantsController, FavouriteDishesController],
  providers: [
    AddFavouriteRestaurantHandler,
    ListFavouriteRestaurantsHandler,
    RemoveFavouriteRestaurantHandler,
    ListFavouriteDishesHandler,
    AddFavouriteDishHandler,
    RemoveFavouriteDishHandler,
  ],
})
class FavouritesModule {}

export { FavouritesModule };
