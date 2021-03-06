import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { Document, SchemaTypes } from 'mongoose';

import { Address } from '../../addresses/database/AddressSchema';
import { Order } from '../../orders/database/OrderSchema';
import { Restaurant } from '../../restaurants/database/RestaurantSchema';
import { Dish } from '../../restaurants/dishes/database/DishesSchema';

type UserDocument = User & Document<ObjectId>;

const USER_CONSTANTS = Object.freeze({
  NAME: Object.freeze({
    MIN_LENGTH: 3,
    MAX_LENGTH: 35,
  }),
  CARD: Object.freeze({
    NUMBER: {
      REGEX:
        /^(?:4[0-9]{12}(?:[0-9]{3})?)|(?:3[47][0-9]{13})|(?:5[1-5][0-9]{14})|(?:6(?:011|5[0-9][0-9])[0-9]{12})|(?:(?:2131|1800|35\d{3})\d{11})|(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/,
    },
    EXPIRATION_DATE: '([0-9]{4})-(?:[0-9]{2})-([0-9]{2})',
    CVC: { MIN_LENGTH: 3, MAX_LENGTH: 4 },
  }),
});

@Exclude()
class Card {
  @Expose()
  number: string;

  @Expose()
  expirationDate: string;

  @Expose()
  securityCode: string;
}

@Exclude()
@Schema({
  collection: 'users',
})
class User {
  get isCompleted() {
    return (
      [this.name, this.surname, this.phoneNumber].every(_.negate(_.isNil)) &&
      this.addressId.length > 0 &&
      !_.isEmpty(this.card)
    );
  }

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
  @Prop()
  email: string;

  @Expose()
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Address' }] })
  addressId: Address[];

  @Expose()
  @Type(() => Card)
  @Prop(
    raw({
      number: { type: String, match: USER_CONSTANTS.CARD.NUMBER.REGEX },
      expirationDate: { type: String },
      securityCode: {
        type: String,
        min: USER_CONSTANTS.CARD.CVC.MIN_LENGTH,
        max: USER_CONSTANTS.CARD.CVC.MAX_LENGTH,
      },
    }),
  )
  card: Card;

  @Expose()
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Restaurant' }] })
  favouriteRestaurants: Restaurant[];

  @Expose()
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Dish' }] })
  favouriteDishes: Dish[];

  @Expose()
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Order' }] })
  orders: Order[];

  @Expose()
  readonly id: string;
}

const UserSchema = SchemaFactory.createForClass(User);

const getter = (() => {
  const fn = Object.getOwnPropertyDescriptor(User.prototype, 'isCompleted')?.get;
  if (!fn) throw new Error('User should have isCompleted getter');
  return fn;
})();

UserSchema.virtual('isCompleted').get(getter);

export { Card, User, USER_CONSTANTS, UserSchema };
export type { UserDocument };
