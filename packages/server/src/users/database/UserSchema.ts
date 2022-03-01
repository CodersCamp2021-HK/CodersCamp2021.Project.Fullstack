import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

import { Address } from '../../addresses/database/AddressSchema';
import { Dish } from '../../restaurants/database/DishesSchema';
import { Restaurant } from '../../restaurants/database/RestaurantSchema';
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
  @Prop({ required: true })
  phoneNumber: string;

  @Expose()
  @Prop({ type: [{ type: ObjectId, ref: 'Address' }] })
  addressId: Address[];

  @Expose()
  @Prop(
    raw({
      number: { type: String, required: true, match: USER_CONSTANTS.CARD.NUMBER.REGEX },
      expirationDate: { type: Date, required: true },
      securityCode: {
        type: String,
        required: true,
        min: USER_CONSTANTS.CARD.CVC.MIN_LENGTH,
        max: USER_CONSTANTS.CARD.CVC.MAX_LENGTH,
      },
    }),
  )
  card: object[];

  @Expose()
  @Prop({ type: [{ type: ObjectId, ref: 'Restaurant' }] })
  favouriteRestaurants: Restaurant[];

  @Expose()
  @Prop({ type: [{ type: ObjectId, ref: 'Dish' }] })
  favouriteDishes: Dish[];

  // TODO: import Order schema and change orders type
  @Expose()
  @Prop({ type: [{ type: ObjectId, ref: 'Order' }] })
  orders: ObjectId[];

  @Expose()
  @Prop({ default: false })
  profileCompleted: boolean;

  @Expose()
  readonly id: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
export type { UserDocument };
