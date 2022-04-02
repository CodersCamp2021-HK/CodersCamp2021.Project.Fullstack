import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './api';
import { User, UserSchema } from './database';
import { GetUserHandler } from './domain';
import { UpdateUserProfileHandler } from './domain/UpdateUserProfileHandler';
import { UsersFacade, UsersFavFacade } from './infra';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersFacade, UsersFavFacade, GetUserHandler, UpdateUserProfileHandler],
  exports: [UsersFacade, UsersFavFacade],
})
class UsersModule {}

export { UsersModule };
