import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Auth, AuthDocument } from '../../auth/database';
import { OrderMailService } from '../../mail';
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
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private readonly orderMailService: OrderMailService,
  ) {}

  async exec(req: CreateOrderRequest): Promise<Order> {
    const created = await this.orderModel.create({ ...req, date: new Date() });
    const userDoc = await this.authModel.findOne({ entityId: req.userId });

    if (userDoc != null) {
      await this.orderMailService.sendOrderConfirmation(userDoc, created);
    }

    return plainToInstance(Order, created);
  }
}

export { CreateOrderHandler };
