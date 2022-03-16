import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Dish, DishDocument } from '../../restaurants/dishes/database';
import { Handler } from '../../shared';
import { Order, OrderDocument } from '../database';

interface CreateOrderRequest {
  addressId: string;
  userId: string;
  dishPrice: number;
  subOrders: {
    deliveryDate: Date;
    hourStart: number;
    hourEnd: number;
    dishes: {
      dishId: string;
      count?: number;
      excludedIngredients?: string[];
    }[];
  }[];
  comment?: string;
}

@Injectable()
class CreateOrderHandler implements Handler<CreateOrderRequest, Order> {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
  ) {}

  async exec(req: CreateOrderRequest): Promise<Order> {
    const created = await this.orderModel.create({ ...req, date: new Date() });
    const cena = await this.dishModel.findById('6231b2a1aa17f1ade2e26590');
    const result = await this.orderModel.updateOne({ dishPrice: 31 });
    console.log(cena?.price);
    console.log(result);
    return plainToInstance(Order, created);
  }
}

export { CreateOrderHandler };
