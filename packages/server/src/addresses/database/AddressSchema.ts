import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

type AddressDocument = Address & Document<ObjectId>;

const ADDRESS_CONSTANTS = Object.freeze({
  STREET_NUMBER: Object.freeze({
    REGEX: /^\d+[A-Za-z]?$/,
    MAX_LENGTH: 4,
  }),
  POSTCODE: Object.freeze({ REGEX: /^\d{2}-\d{3}$/ }),
});
@Exclude()
@Schema({
  collection: 'addresses',
})
class Address {
  @Expose()
  @Prop({ required: true })
  street: string;

  @Expose()
  @Prop({
    required: true,
    match: ADDRESS_CONSTANTS.STREET_NUMBER.REGEX,
    maxlength: ADDRESS_CONSTANTS.STREET_NUMBER.MAX_LENGTH,
  })
  streetNumber: string;

  @Expose()
  @Prop()
  apartmentNumber: number;

  @Expose()
  @Prop()
  floor: number;

  @Expose()
  @Prop({ required: true })
  city: string;

  @Expose()
  @Prop({
    required: true,
    match: ADDRESS_CONSTANTS.POSTCODE.REGEX,
  })
  postcode: string;

  @Expose()
  readonly id: string;
}

const AddressSchema = SchemaFactory.createForClass(Address);

export { Address, ADDRESS_CONSTANTS, AddressSchema };
export type { AddressDocument };
