import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Role } from '../../shared';
import { EMAIL } from '../shared';

type AuthDocument = Auth & Document<ObjectId>;

@Exclude()
@Schema({
  collection: 'auth',
})
class Auth {
  readonly id: string;

  @Prop({
    match: EMAIL.REGEX,
    maxlength: EMAIL.MAX_LEN,
    unique: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: String,
    enum: [Role.Partner, Role.User],
  })
  role: Role;

  @Prop({ type: MongooseSchema.Types.ObjectId, default: undefined })
  entityId?: ObjectId;

  @Prop({ default: false })
  verified: boolean;
}

const AuthSchema = SchemaFactory.createForClass(Auth);

export { Auth, AuthSchema };
export type { AuthDocument };
