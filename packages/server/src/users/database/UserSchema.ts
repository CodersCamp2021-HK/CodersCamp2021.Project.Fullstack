import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

type UserDocument = User & Document<ObjectId>;

const USER_CONSTANTS = Object.freeze({
  TITLE: Object.freeze({
    MIN_LENGTH: 4,
    MAX_LENGTH: 256,
  }),
  CONTENT: Object.freeze({
    MIN_LENGTH: 4,
    MAX_LENGTH: 32768,
  }),
});

@Exclude()
@Schema({
  collection: 'users',
})
class User {
  @Expose()
  @Prop({
    minlength: USER_CONSTANTS.TITLE.MIN_LENGTH,
    maxlength: USER_CONSTANTS.TITLE.MAX_LENGTH,
  })
  title: string;

  @Expose()
  @Prop({
    minlength: USER_CONSTANTS.CONTENT.MIN_LENGTH,
    maxlength: USER_CONSTANTS.CONTENT.MAX_LENGTH,
  })
  content: string;

  @Expose()
  readonly id: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, USER_CONSTANTS, UserSchema };
export type { UserDocument };
