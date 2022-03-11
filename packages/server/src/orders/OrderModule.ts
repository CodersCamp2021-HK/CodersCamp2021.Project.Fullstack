import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderController } from './api';
import { Order, OrderSchema } from './database';
import { CreateOrderHandler } from './domain';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [OrderController],
  providers: [CreateOrderHandler],
})
class OrderModule {}

export { OrderModule };
