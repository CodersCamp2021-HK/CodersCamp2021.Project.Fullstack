import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

import { Address } from '../../addresses/database/AddressSchema';
import { Order } from '../../orders/database/OrderSchema';
import { Restaurant } from '../../restaurants/database/RestaurantSchema';
import { Dish } from '../../restaurants/dishes/database/DishesSchema';

type UserDocument = User & Document<ObjectId>;

const USER_CONSTANTS = Object.freeze({
  CARD: Object.freeze({
    NUMBER: {
      REGEX:
        /^(?:4[0-9]{12}(?:[0-9]{3})?)|(?:3[47][0-9]{13})|(?:5[1-5][0-9]{14})|(?:6(?:011|5[0-9][0-9])[0-9]{12})|(?:(?:2131|1800|35\d{3})\d{11})|(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/,
    },
    CVC: { MIN_LENGTH: 3, MAX_LENGTH: 4 },
  }),
});

@Exclude()
class Card {
  @Expose()
  number: string;

  @Expose()
  expirationDate: Date;

  @Expose()
  securityCode: string;
}

@Exclude()
@Schema({
  collection: 'users',
})
class User {
  @Expose()
  @Prop()
  name: string;

  @Expose()
  @Prop()
  surname: string;

  @Expose()
  @Prop()
  phoneNumber: string;

  @Expose()
  @Prop({ type: [{ type: ObjectId, ref: 'Address' }] })
  addressId: Address[];

  @Expose()
  @Type(() => Card)
  @Prop(
    raw({
      number: { type: String, match: USER_CONSTANTS.CARD.NUMBER.REGEX },
      expirationDate: { type: Date },
      securityCode: {
        type: String,
        min: USER_CONSTANTS.CARD.CVC.MIN_LENGTH,
        max: USER_CONSTANTS.CARD.CVC.MAX_LENGTH,
      },
    }),
  )
  card: Card;

  @Expose()
  @Prop({ type: [{ type: ObjectId, ref: 'Restaurant' }] })
  favouriteRestaurants: Restaurant[];

  @Expose()
  @Prop({ type: [{ type: ObjectId, ref: 'Dish' }] })
  favouriteDishes: Dish[];

  @Expose()
  @Prop({ type: [{ type: ObjectId, ref: 'Order' }] })
  orders: Order[];

  @Expose()
  @Prop({ default: false })
  profileCompleted: boolean;

  @Expose()
  readonly id: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { Card, User, USER_CONSTANTS, UserSchema };
export type { UserDocument };
