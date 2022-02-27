import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';

type UserDocument = User & Document<ObjectId>;

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
  @Prop({ ref: 'Ad' })
  addressId: mongoose.Schema.Types.ObjectId;

  @Expose()
  @Prop(
    raw({
      number: { type: Number, required: true },
      expirationDate: { type: Date, required: true },
      securityCode: { type: Number, required: true },
    }),
  )
  card: object[];

  @Expose()
  @Prop({ ref: 'Rest' })
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
