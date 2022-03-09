import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Order, OrderDocument } from '../database';

interface CreateOrderRequest {
  addressId: string;
  userId: string;
  subOrders: {
    deliveryDate: Date;
    hourStart: number;
    hourEnd: number;
    dishes: {
      dishId: string;
      count: number;
      excludedIngredients: string[];
    }[];
  }[];
  comment: string;
}

@Injectable()
class CreateOrderHandler implements Handler<CreateOrderRequest, Order> {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async exec(req: CreateOrderRequest): Promise<Order> {
    const created = await this.orderModel.create({ ...req, date: new Date() });
    return plainToInstance(Order, created);
  }
}

export { CreateOrderHandler };
