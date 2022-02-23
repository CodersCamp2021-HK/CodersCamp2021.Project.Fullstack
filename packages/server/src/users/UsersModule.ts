import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './api';
import { User, UserSchema } from './database';
import { UsersFacade } from './infra';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersFacade],
  controllers: [UsersController],
  exports: [UsersFacade],
})
class UsersModule {}

export { UsersModule };
