import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document, SchemaTypes } from 'mongoose';

import { Address } from '../../addresses/database/AddressSchema';
import { Dish } from '../../restaurants/dishes/database/DishesSchema';
import { ExposeId } from '../../shared';
import { User } from '../../users/database/UserSchema';

export type OrderDocument = Order & Document<ObjectId>;

const ORDER_CONSTANTS = Object.freeze({
  COMMENT: Object.freeze({
    MAX_LENGTH: 300,
  }),
  HOUR: Object.freeze({
    MIN: 0,
    MAX: 23,
  }),
  COUNT: Object.freeze({
    MIN: 1,
  }),
});

@Exclude()
@Schema({ _id: false })
class OrderDish {
  @Expose()
  @ExposeId()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Dish', required: true })
  readonly dishId: Dish;

  @Expose()
  @Prop({ default: ORDER_CONSTANTS.COUNT.MIN, min: ORDER_CONSTANTS.COUNT.MIN })
  readonly count: number;

  @Expose()
  @Prop()
  readonly excludedIngredients: string[];
}

const OrderDishSchema = SchemaFactory.createForClass(OrderDish);

@Exclude()
@Schema({ _id: false })
class SubOrder {
  @Expose()
  @Prop({ required: true })
  readonly deliveryDate: Date;

  @Expose()
  @Prop({ required: true, min: ORDER_CONSTANTS.HOUR.MIN, max: ORDER_CONSTANTS.HOUR.MAX })
  readonly hourStart: number;

  @Expose()
  @Prop({ required: true, min: ORDER_CONSTANTS.HOUR.MIN, max: ORDER_CONSTANTS.HOUR.MAX })
  readonly hourEnd: number;

  @Expose()
  @Type(() => OrderDish)
  @Prop({ type: [OrderDishSchema] })
  readonly dishes: OrderDish[];
}

const SubOrderSchema = SchemaFactory.createForClass(SubOrder);

@Exclude()
@Schema({
  collection: 'order',
})
class Order {
  @Expose()
  readonly id: string;

  @Expose()
  @ExposeId()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Address', required: true })
  readonly addressId: Address;

  @Expose()
  @ExposeId()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  readonly userId: User;

  @Expose()
  @Prop({ required: true })
  readonly date: Date;

  @Expose()
  @Type(() => SubOrder)
  @Prop({ type: [SubOrderSchema] })
  readonly subOrders: SubOrder[];

  @Expose()
  @Prop({
    maxlength: ORDER_CONSTANTS.COMMENT.MAX_LENGTH,
  })
  readonly comment: string;
}

const OrderSchema = SchemaFactory.createForClass(Order);

export { Order, ORDER_CONSTANTS, OrderSchema, SubOrder };
