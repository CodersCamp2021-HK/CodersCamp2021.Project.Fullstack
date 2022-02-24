import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './database';
import { UsersFacade } from './infra';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersFacade],
  exports: [UsersFacade],
})
class UsersModule {}

export { UsersModule };
