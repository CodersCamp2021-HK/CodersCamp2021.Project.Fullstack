import { INestApplicationContext } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { Document, SchemaTypes } from 'mongoose';

import { Address } from '../../addresses/database/AddressSchema';
import { PHONE_NUMBER } from '../../auth/shared';
import { DBImage } from '../../image/shared';
import { Dish } from '../dishes/database';

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
  Mexican = 'meksykańska',
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
    REGEX: /^\d{26}$/,
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
  get isCompleted() {
    const requirements = {
      name: this.name,
      bankAccountNumber: this.bankAccountNumber,
      phoneNumber: this.phoneNumber,
      addressId: this.addressId,
      logo: this.logo,
      description: this.description,
      cuisineType: this.cuisineType,
      tags: this.tags,
    };

    if (!_.values(requirements).some(_.isNull)) return false;
    return true;
  }

  @Expose()
  @Prop({
    minlength: RESTAURANT_CONSTANTS.NAME.MIN_LENGTH,
    maxlength: RESTAURANT_CONSTANTS.NAME.MAX_LENGTH,
  })
  name: string;

  @Expose()
  @Prop({ match: RESTAURANT_CONSTANTS.BANK_ACCOUNT_NUMBER.REGEX })
  bankAccountNumber: string;

  @Expose()
  @Prop({
    match: PHONE_NUMBER.REGEX,
    maxlength: PHONE_NUMBER.MAX_LEN,
  })
  phoneNumber: string;

  @Expose()
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Address' }] })
  addressId: Address[];

  @Expose()
  @Type(() => DBImage)
  @Prop()
  logo: DBImage;

  @Expose()
  @Prop({
    maxlength: RESTAURANT_CONSTANTS.DESCRIPTION.MAX_LENGTH,
  })
  description: string;

  @Expose()
  @Prop()
  cuisineType: CuisineTypes[];

  @Expose()
  @Prop()
  tags: RestaurantTags[];

  @Expose()
  @Prop({ default: false })
  profileCompleted: boolean;

  @Expose()
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Dish' }] })
  dishes: Dish[];

  @Expose()
  readonly id: string;
}

const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
const getter = Object?.getOwnPropertyDescriptor(Restaurant.prototype, 'isCompleted')?.get;

RestaurantSchema.virtual('isCompleted').get(function () {
  return getter;
});

export { CuisineTypes, Restaurant, RESTAURANT_CONSTANTS, RestaurantSchema, RestaurantTags };
export type { RestaurantDocument };
