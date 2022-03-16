import { Body, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { ApiAuthorization, ApiController, ApiCreate, Role, Url, UserId } from '../../shared';
import { CreateOrderHandler } from '../domain';
import { CreateOrderDto, OrderDto } from './OrderDto';

@ApiController({ path: 'orders', name: 'Orders', description: 'Submitting an order' })
class OrderController {
  constructor(private readonly createOrderHandler: CreateOrderHandler) {}

  @ApiCreate({ name: 'order', response: OrderDto })
  @ApiAuthorization(Role.User)
  async create(
    @UserId() userId: string,
    @Body() createOrderDto: CreateOrderDto,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
  ) {
    const order = await this.createOrderHandler.exec({
      ...createOrderDto,
      userId,
    });
    res.setHeader('Location', `${url.href}/${order.id}`);
    return plainToInstance(OrderDto, order);
  }
}

export { OrderController };
