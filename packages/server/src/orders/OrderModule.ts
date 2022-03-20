import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Auth, AuthSchema } from '../auth/database';
import { AuthFacade } from '../auth/infra';
import { User, UserSchema } from '../users/database';
import { OrderController } from './api';
import { Order, OrderSchema } from './database';
import { CreateOrderHandler } from './domain';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [OrderController],
  providers: [CreateOrderHandler, AuthFacade],
})
class OrderModule {}

export { OrderModule };
