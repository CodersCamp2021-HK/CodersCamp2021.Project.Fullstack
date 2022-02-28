import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';

type DishDocument = Dish & Document<ObjectId>;

enum DishTags {
  Vegan = 'wegańska',
  Vegetarian = 'wegetariańska',
  GlutenFree = 'gluten free',
  Spicy = 'ostre',
  VerySpicy = 'bardzo ostre',
}

enum MealType {
  Breakfast = 'śniadanie',
  Lunch = 'lunch',
  Dinner = 'obiad',
  Supper = 'kolacja',
}

enum Allergens {
  Gluten = 'gluten',
  ShellFish = 'skorupiaki',
  Eggs = 'jaja',
  Fish = 'ryby',
  Nuts = 'orzechy',
  Soya = 'soja',
  Milk = 'mleko',
  Celery = 'seler',
  Mustard = 'gorczyca',
  SesameSeeds = 'nasiona sezamu',
  SulphurDioxide = 'dwutlenek siarki',
  Lupine = 'łubin',
  Molluscs = 'mięczaki',
}

const DISH_CONSTANTS = Object.freeze({
  DISH_LEN_STR: Object.freeze({
    MIN_LENGTH: 1,
    MAX_LENGTH: 500,
  }),
  DISH_LEN_NUMBER: Object.freeze({
    MIN_LENGTH: 1,
    MAX_LENGTH: 5,
  }),
});

@Exclude()
@Schema({
  collection: 'dishes',
})
class Dish {
  @Expose()
  @Prop({
    required: true,
    minlength: DISH_CONSTANTS.DISH_LEN_STR.MIN_LENGTH,
    maxlength: DISH_CONSTANTS.DISH_LEN_STR.MAX_LENGTH,
  })
  name: string;

  @Expose()
  @Prop({
    type: [{ enum: MealType }],
    minlength: DISH_CONSTANTS.DISH_LEN_STR.MIN_LENGTH,
    maxlength: DISH_CONSTANTS.DISH_LEN_STR.MAX_LENGTH,
  })
  mealType: string[];

  @Expose()
  @Prop({
    minlength: DISH_CONSTANTS.DISH_LEN_STR.MIN_LENGTH,
    maxlength: DISH_CONSTANTS.DISH_LEN_STR.MAX_LENGTH,
  })
  description: string;

  @Expose()
  @Prop({
    required: true,
    minlength: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
    maxlength: DISH_CONSTANTS.DISH_LEN_NUMBER.MAX_LENGTH,
  })
  price: mongoose.Decimal128;

  @Expose()
  @Prop()
  photo: Buffer;

  @Expose()
  @Prop({
    type: [{ enum: DishTags }],
    minlength: DISH_CONSTANTS.DISH_LEN_STR.MIN_LENGTH,
    maxlength: DISH_CONSTANTS.DISH_LEN_STR.MAX_LENGTH,
  })
  tags: string[];

  @Expose()
  @Prop(
    raw({
      name: {
        type: String,
        minlength: DISH_CONSTANTS.DISH_LEN_STR.MIN_LENGTH,
        maxlength: DISH_CONSTANTS.DISH_LEN_STR.MAX_LENGTH,
      },
      canBeExcluded: { type: Boolean, default: false },
    }),
  )
  ingredients: object[];

  @Expose()
  @Prop({ type: [{ enum: Allergens }] })
  allergens: string[];

  @Expose()
  @Prop({
    min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
    max: DISH_CONSTANTS.DISH_LEN_NUMBER.MAX_LENGTH,
  })
  portionWeight: number;

  @Expose()
  @Prop({
    required: true,
    min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
    max: DISH_CONSTANTS.DISH_LEN_NUMBER.MAX_LENGTH,
  })
  calories: number;

  @Expose()
  @Prop(
    raw({
      per100g: {
        type: Number,
        required: true,
        min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
        max: DISH_CONSTANTS.DISH_LEN_NUMBER.MAX_LENGTH,
      },
      perPortion: Number,
      min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
      max: DISH_CONSTANTS.DISH_LEN_NUMBER.MAX_LENGTH,
    }),
  )
  fats: {};

  @Expose()
  @Prop(
    raw({
      per100g: {
        type: Number,
        required: true,
        min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
        max: DISH_CONSTANTS.DISH_LEN_NUMBER.MAX_LENGTH,
      },
      perPortion: Number,
      min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
      max: DISH_CONSTANTS.DISH_LEN_NUMBER.MAX_LENGTH,
    }),
  )
  proteins: {};

  @Expose()
  @Prop(
    raw({
      per100g: {
        type: Number,
        required: true,
        min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
        max: DISH_CONSTANTS.DISH_LEN_NUMBER.MAX_LENGTH,
      },
      perPortion: Number,
      min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
      max: DISH_CONSTANTS.DISH_LEN_NUMBER.MAX_LENGTH,
    }),
  )
  carbohydrates: {};

  @Expose()
  readonly id: string;
}

const DishSchema = SchemaFactory.createForClass(Dish);

export { Dish, DISH_CONSTANTS, DishSchema };
export type { DishDocument };
