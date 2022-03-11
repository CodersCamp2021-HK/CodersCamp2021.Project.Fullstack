import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ApiObjectIdProperty } from '../../shared';
import { ORDER_CONSTANTS } from '../database';

class OrderDishDto {
  @Type(() => String)
  @ApiObjectIdProperty()
  readonly dishId: string;

  @ApiProperty({ minimum: ORDER_CONSTANTS.COUNT.MIN })
  readonly count: number;

  @ApiProperty({ example: [] })
  readonly excludedIngredients: string[];
}

class SubOrderDto {
  @ApiProperty({ required: true })
  readonly deliveryDate: Date;

  @ApiProperty({ required: true, example: 8, minimum: ORDER_CONSTANTS.HOUR.MIN, maximum: ORDER_CONSTANTS.HOUR.MAX })
  readonly hourStart: number;

  @ApiProperty({ required: true, example: 11, minimum: ORDER_CONSTANTS.HOUR.MIN, maximum: ORDER_CONSTANTS.HOUR.MAX })
  readonly hourEnd: number;

  @Type(() => OrderDishDto)
  @ApiProperty({ type: [OrderDishDto] })
  readonly dishes: OrderDishDto[];
}

class OrderDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @Type(() => String)
  @ApiObjectIdProperty()
  readonly addressId: string;

  @Type(() => String)
  @ApiObjectIdProperty()
  readonly userId: string;

  @ApiProperty({ required: true })
  readonly date: Date;

  @Type(() => SubOrderDto)
  @ApiProperty({ type: [SubOrderDto] })
  readonly subOrders: SubOrderDto[];

  @ApiProperty({
    maxLength: ORDER_CONSTANTS.COMMENT.MAX_LENGTH,
    example: 'Additional requests for the restaurant.',
  })
  readonly comment: string;
}

class CreateOrderDto extends OmitType(OrderDto, ['id', 'date', 'userId'] as const) {}

export { CreateOrderDto, OrderDto };
