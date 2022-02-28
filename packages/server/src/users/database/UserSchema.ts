import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

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
  email: string;

  @Expose()
  @Prop({ required: true })
  password: string;

  @Expose()
  @Prop({ required: true })
  phoneNumber: string;

  @Expose()
  @Prop({ ref: 'Address' })
  addressId: ObjectId;

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
  @Prop({ ref: 'Restaurant' })
  favouriteRestaurants: ObjectId;

  @Expose()
  @Prop({ ref: 'Dish' })
  favouriteDishes: ObjectId;

  @Expose()
  @Prop({ ref: 'Order' })
  orders: ObjectId;

  @Expose()
  @Prop({ default: false })
  profileCompleted: boolean;

  @Expose()
  readonly id: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
export type { UserDocument };
