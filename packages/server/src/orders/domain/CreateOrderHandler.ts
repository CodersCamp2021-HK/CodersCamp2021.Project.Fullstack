import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { User, UserDocument } from '../../users/database';
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
      count?: number;
      excludedIngredients?: string[];
    }[];
  }[];
  comment?: string;
}

@Injectable()
class CreateOrderHandler implements Handler<CreateOrderRequest, Order | null> {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async exec(req: CreateOrderRequest): Promise<Order | null> {
    const user = await this.userModel.findById(req.userId);
    if (user?.profileCompleted) {
      const created = await this.orderModel.create({ ...req, date: new Date() });
      return plainToInstance(Order, created);
    }
    return null;
  }
}

export { CreateOrderHandler };
