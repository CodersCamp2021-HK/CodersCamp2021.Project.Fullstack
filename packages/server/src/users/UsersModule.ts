import { Module } from '@nestjs/common';

import { UserFavouriteRestaurantsController } from './api';

@Module({
  controllers: [UserFavouriteRestaurantsController],
})
class UsersModule {}

export { UsersModule };
