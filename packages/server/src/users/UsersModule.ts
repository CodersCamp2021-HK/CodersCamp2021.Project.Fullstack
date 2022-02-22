import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './api';
import { User, UserSchema } from './database';
import {
  ListUsersHandler,
} from './domain';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [ListUsersHandler],
})
class UsersModule {}

export { UsersModule };
