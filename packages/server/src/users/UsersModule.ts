import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './database';
import { FavouriteDishListController, FavouriteRestaurantListController } from './favourites/api';
import { UsersFacade } from './infra';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [FavouriteRestaurantListController, FavouriteDishListController],
  providers: [UsersFacade],
  exports: [UsersFacade],
})
class UsersModule {}

export { UsersModule };
