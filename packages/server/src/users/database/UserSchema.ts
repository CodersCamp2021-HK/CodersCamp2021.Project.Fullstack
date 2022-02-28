import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';

type UserDocument = User & Document<ObjectId>;

const USER_CONSTANTS = Object.freeze({
  CARD: Object.freeze({
    NUMBER: {
      REGEX: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
    },
    CVV: { MIN_LENGTH: 3, MAX_LENGTH: 3 },
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
  addressId: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Prop(
    raw({
      number: { type: Number, required: true, match: USER_CONSTANTS.CARD.NUMBER.REGEX },
      expirationDate: { type: Date, required: true },
      securityCode: {
        type: Number,
        required: true,
        min: USER_CONSTANTS.CARD.CVV.MIN_LENGTH,
        max: USER_CONSTANTS.CARD.CVV.MAX_LENGTH,
      },
    }),
  )
  card: object[];

  @Expose()
  @Prop({ ref: 'Restaurant' })
  favouriteRestaurants: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Prop({ ref: 'Dish' })
  favouriteDishes: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Prop({ ref: 'Order' })
  orders: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Prop({ default: false })
  profileCompleted: boolean;

  @Expose()
  readonly id: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
export type { UserDocument };
