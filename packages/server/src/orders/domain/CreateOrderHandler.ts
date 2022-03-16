import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Dish, DishDocument, DishSchema } from '../../restaurants/dishes/database';
import { Handler } from '../../shared';
import { Order, OrderDocument } from '../database';

interface CreateOrderRequest {
  readonly id: string;
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

    // i tutaj jest problem z tym req.subOrders.dishes.dishId
    // const dishData = await this.dishModel.findById({ _id: req.subOrders.dishes.dishId });

    await this.orderModel.updateOne({ id: req.id }, { dishPrice: 100 });

    return plainToInstance(Order, created);
  }
}

export { CreateOrderHandler };
