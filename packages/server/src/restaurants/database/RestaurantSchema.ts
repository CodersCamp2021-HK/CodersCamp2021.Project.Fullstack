import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

import { Address } from '../../addresses/database/AddressSchema';

type RestaurantDocument = Restaurant & Document<ObjectId>;

enum CuisineTypes {
  American = 'amerykańska',
  Asian = 'azjatycka',
  European = 'europejska',
  Arab = 'arabska',
  Chinese = 'chińska',
  French = 'francuska',
  Georgian = 'gruzińska',
  Greek = 'grecka',
  Indian = 'indyjska',
  Italian = 'włoska',
  Japanese = 'japońska',
  Jewish = 'żydowska',
  Korean = 'koreańska',
  Lebanese = 'libańska',
  Mediterranean = 'śródziemnomorska',
  Mexican = 'meksykanśka',
  Polish = 'polska',
  Thai = 'tajska',
  Turkish = 'turecka',
  Vietnamese = 'wietnamska',
}

enum RestaurantTags {
  FastFood = 'fast food',
  Vegan = 'wegańska',
  Vegetarian = 'wegetariańska',
  Cafe = 'kawiarnia',
  Healthy = 'zdrowa',
  StreetFood = 'street food',
  Desserts = 'desery',
  Pizza = 'pizza',
  Burgers = 'burgery',
  Sushi = 'sushi',
  Kebab = 'kebab',
  GlutenFree = 'gluten free',
}

const RESTAURANT_CONSTANTS = Object.freeze({
  NAME: Object.freeze({
    MIN_LENGTH: 1,
    MAX_LENGTH: 50,
  }),
  BANK_ACCOUNT_NUMBER: Object.freeze({
    REGEX: /\W*\d{8,19}\b/,
  }),
  PHONE_NUMBER: Object.freeze({
    REGEX: /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/,
  }),
  DESCRIPTION: Object.freeze({
    MAX_LENGTH: 500,
  }),
});

@Exclude()
@Schema({
  collection: 'restaurants',
})
class Restaurant {
  @Prop({
    minlength: RESTAURANT_CONSTANTS.NAME.MIN_LENGTH,
    maxlength: RESTAURANT_CONSTANTS.NAME.MAX_LENGTH,
  })
  name: string;

  @Expose()
  @Prop({ match: RESTAURANT_CONSTANTS.BANK_ACCOUNT_NUMBER.REGEX })
  bankAccountNumber: string;

  @Expose()
  @Prop({ match: RESTAURANT_CONSTANTS.PHONE_NUMBER.REGEX })
  phoneNumber: string;

  @Expose()
  @Prop({ type: [{ type: ObjectId, ref: 'Address' }] })
  addressId: Address[];

  @Expose()
  @Prop()
  logo: string;

  @Expose()
  @Prop({
    maxlength: RESTAURANT_CONSTANTS.DESCRIPTION.MAX_LENGTH,
  })
  description: string;

  @Expose()
  @Prop({ type: [{ enum: CuisineTypes }] })
  cuisineType: string[];

  @Expose()
  @Prop({ type: [{ enum: RestaurantTags }] })
  tags: string[];

  @Expose()
  @Prop({ default: false })
  profileCompleted: boolean;

  @Expose()
  readonly id: string;
}

const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

export { Restaurant, RestaurantSchema };
export type { RestaurantDocument };
