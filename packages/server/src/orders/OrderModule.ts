import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth';
import { RestaurantsModule } from '../restaurants';
import { UsersModule } from '../users';
import { OrderController } from './api';
import { Order, OrderSchema } from './database';
import { CreateOrderHandler } from './domain';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    AuthModule,
    UsersModule,
    RestaurantsModule,
  ],
  controllers: [OrderController],
  providers: [CreateOrderHandler],
})
class OrderModule {}

export { OrderModule };
