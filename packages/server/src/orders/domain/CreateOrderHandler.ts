import { UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { AuthFacade } from '../../auth/infra/AuthFacade';
import { OrderMailService } from '../../mail';
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

class CreateOrderHandler implements Handler<CreateOrderRequest, Order> {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly authFacade: AuthFacade,
    private readonly orderMailService: OrderMailService,
  ) {}

  async exec(req: CreateOrderRequest): Promise<Order> {
    const user = await this.userModel.findById(req.userId);
    if (user?.isCompleted) {
      const created = await this.orderModel.create({ ...req, date: new Date() });
      const mail = await this.authFacade.getEmailByUserId(req.userId);

      if (mail != null) {
        await this.orderMailService.sendOrderConfirmation(mail, created.id);
      }
      return plainToInstance(Order, created);
    } else throw new UnprocessableEntityException();
  }
}

export { CreateOrderHandler };
