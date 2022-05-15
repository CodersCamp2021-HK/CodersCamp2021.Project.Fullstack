import { UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { AuthFacade } from '../../auth/infra/AuthFacade';
import { OrderMailService } from '../../mail';
import { DishesFacade } from '../../restaurants';
import { Handler } from '../../shared';
import { UsersFacade } from '../../users';
import { Order, OrderDocument } from '../database';

interface CreateOrderRequest {
  addressId: string;
  userId: string;
  hourStart: number;
  hourEnd: number;
  subOrders: {
    deliveryDate: Date;
    dishes: {
      dishId: string;
      count: number;
      excludedIngredients: string[];
    }[];
  }[];
  comment?: string;
}

class CreateOrderHandler implements Handler<CreateOrderRequest, Order> {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly usersFacade: UsersFacade,
    private readonly authFacade: AuthFacade,
    private readonly dishesFacade: DishesFacade,
    private readonly orderMailService: OrderMailService,
  ) {}

  async exec(req: CreateOrderRequest): Promise<Order> {
    const userCanOrder = await this.usersFacade.canOrder(req.userId);
    if (!userCanOrder) throw new UnprocessableEntityException("This user can't order a dish!");

    const dishesAreValid = await this.dishesFacade.areOrderable(
      req.subOrders.flatMap((suborder) => suborder.dishes.map((dish) => dish.dishId)),
    );
    if (!dishesAreValid) throw new UnprocessableEntityException('Invalid dishes supplied!');

    const created = await this.orderModel.create({ ...req, date: new Date() });

    const mail = await this.authFacade.getEmailByUserId(req.userId);
    if (mail != undefined) {
      await this.orderMailService.sendOrderConfirmation(mail, created.id);
    }

    return plainToInstance(Order, created);
  }
}

export { CreateOrderHandler };
