import { Module } from '@nestjs/common';

import { UserFavouriteRestaurantsController } from './favourites/api';

@Module({
  controllers: [UserFavouriteRestaurantsController],
})
class UsersModule {}

export { UsersModule };
