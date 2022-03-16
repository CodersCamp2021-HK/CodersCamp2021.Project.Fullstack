import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Dish, DishSchema } from '../restaurants/dishes/database';
import { OrderController } from './api';
import { Order, OrderSchema } from './database';
import { CreateOrderHandler } from './domain';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
  ],
  controllers: [OrderController],
  providers: [CreateOrderHandler],
})
class OrderModule {}

export { OrderModule };
