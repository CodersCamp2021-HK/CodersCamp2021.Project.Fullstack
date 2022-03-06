import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

import { Address } from '../../addresses/database/AddressSchema';
import { Dish } from '../../restaurants/dishes/database/DishesSchema';
import { User } from '../../users/database/UserSchema';

export type OrderDocument = Order & Document;

const ORDER_CONSTANTS = Object.freeze({
  COMMENT: Object.freeze({
    MAX_LENGTH: 300,
  }),
  PRICE: Object.freeze({
    MIN: 0,
  }),
  HOUR: Object.freeze({
    MIN: 0,
    MAX: 23,
  }),
  COUNT: Object.freeze({
    MIN: 1,
  }),
});

class SubOrder {
  @Prop({ required: true })
  deliveryDate: Date;

  @Prop({ required: true, min: ORDER_CONSTANTS.HOUR.MIN, max: ORDER_CONSTANTS.HOUR.MAX })
  hourStart: number;

  @Prop({ required: true, min: ORDER_CONSTANTS.HOUR.MIN, max: ORDER_CONSTANTS.HOUR.MAX })
  hourEnd: number;

  /*
  TODO: When creating a handler this part might need to be refactored.
  Also, remove price from this object when refactoring, as of now price is supplied
  by user, so there is nothing stopping the user from just entering 0 for every item
  in his order and receiving the food for free.
  */
  @Prop(
    raw({
      dishId: {
        type: [{ type: ObjectId, ref: 'Dish' }],
        required: true,
      },
      price: { type: Number, min: ORDER_CONSTANTS.PRICE.MIN },
      count: { type: Number, default: ORDER_CONSTANTS.PRICE.MIN, min: ORDER_CONSTANTS.PRICE.MIN },
      excludedIngredients: { type: [String] },
    }),
  )
  dishes: Dish[];

  @Prop({ default: false })
  delivered: boolean;
}

@Schema({
  collection: 'order',
})
class Order {
  readonly id: string;

  @Prop({ type: ObjectId, ref: 'Address', required: true })
  addressId: Address;

  @Prop({ type: ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  date: Date;

  @Prop()
  subOrders: SubOrder[];

  @Prop({
    maxlength: ORDER_CONSTANTS.COMMENT.MAX_LENGTH,
  })
  comment: string;
}

const OrderSchema = SchemaFactory.createForClass(Order);

export { Order, ORDER_CONSTANTS, OrderSchema };
