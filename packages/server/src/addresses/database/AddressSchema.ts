import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document, SchemaTypes } from 'mongoose';

type AddressDocument = Address & Document<ObjectId>;

const ADDRESS_CONSTANTS = Object.freeze({
  STREET_NUMBER: Object.freeze({
    REGEX: /^\d+[A-Za-z]?$/,
    MAX_LENGTH: 4,
  }),
  POSTCODE: Object.freeze({ REGEX: /^\d{2}-\d{3}$/ }),
  APARTMENT_NUMBER: Object.freeze({ REGEX: /^\d{0,3}$/ }),
  FLOOR: Object.freeze({ REGEX: /^\d{0,2}$/ }),
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
  @Prop({ match: ADDRESS_CONSTANTS.APARTMENT_NUMBER.REGEX })
  apartmentNumber: string;

  @Expose()
  @Prop({ match: ADDRESS_CONSTANTS.FLOOR.REGEX })
  floor: string;

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

  @Expose()
  @Prop({ type: SchemaTypes.ObjectId })
  readonly owner: ObjectId;
}

const AddressSchema = SchemaFactory.createForClass(Address);

export { Address, ADDRESS_CONSTANTS, AddressSchema };
export type { AddressDocument };
