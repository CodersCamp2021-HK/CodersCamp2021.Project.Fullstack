import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './api';
import { User, UserSchema } from './database';
import { GetUserHandler } from './domain';
import { FavouriteDishListController, FavouriteRestaurantListController } from './favourites/api';
import { UsersFacade } from './infra';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [FavouriteRestaurantListController, FavouriteDishListController, UsersController],
  providers: [UsersFacade, GetUserHandler],
  exports: [UsersFacade],
})
class UsersModule {}

export { UsersModule };
