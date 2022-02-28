import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Address } from '../../addresses/database/AddressSchema';
import { User } from '../../users/database/UserSchema';

export type OrderDocument = Order & Document;

const ORDER_CONSTANTS = Object.freeze({
  COMMENT: Object.freeze({
    MAX_LENGTH: 300,
  }),
  PRICE: Object.freeze({
    MIN: 0,
  }),
  COUNT: Object.freeze({
    MIN: 1,
  }),
});

class SubOrder {
  @Prop({ required: true })
  deliveryDate: Date;

  @Prop({ required: true })
  hourStart: Date;

  @Prop({ required: true })
  hourEnd: Date;

  @Prop({ default: false })
  delivered: boolean;
}

@Schema({
  collection: 'order',
})
class Order {
  readonly id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }], required: true })
  addressId: Address[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  date: Date;

  @Prop()
  subOrders: SubOrder[];

  @Prop(
    raw({
      dishId: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }],
        required: true,
      },
      price: { type: Number, min: ORDER_CONSTANTS.PRICE.MIN },
      count: { type: Number, default: ORDER_CONSTANTS.PRICE.MIN, min: ORDER_CONSTANTS.PRICE.MIN },
      excludedIngredients: { type: [String] },
    }),
  )
  dishes: object[];

  @Prop({
    maxlength: ORDER_CONSTANTS.COMMENT.MAX_LENGTH,
  })
  comment: string;
}

const OrderSchema = SchemaFactory.createForClass(Order);

export { OrderSchema };
