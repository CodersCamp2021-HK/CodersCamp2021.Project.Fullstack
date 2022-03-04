import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

import { DBImage } from '../../../image/shared';

type DishDocument = Dish & Document<ObjectId>;

const DISH_CONSTANTS = Object.freeze({
  DISH_LEN_STR: Object.freeze({
    MIN_LENGTH: 1,
    MAX_LENGTH: 500,
  }),
  DISH_NUMBER: Object.freeze({
    MIN: 0,
  }),
});

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

@Exclude()
class Ingredient {
  @Expose()
  readonly name: string;

  @Expose()
  readonly canBeExcluded: boolean;
}
@Exclude()
class NutritionalValue {
  @Expose()
  readonly per100g: number;

  @Expose()
  readonly perPortion: number;
}
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
  @Prop()
  mealType: MealType[];

  @Expose()
  @Prop({
    minlength: DISH_CONSTANTS.DISH_LEN_STR.MIN_LENGTH,
    maxlength: DISH_CONSTANTS.DISH_LEN_STR.MAX_LENGTH,
  })
  description: string;

  @Expose()
  @Prop({
    required: true,
    min: DISH_CONSTANTS.DISH_NUMBER.MIN,
  })
  price: number;

  @Expose()
  @Type(() => DBImage)
  @Prop()
  photo: DBImage;

  @Expose()
  @Prop()
  tags: DishTags[];

  @Expose()
  @Type(() => Ingredient)
  @Prop([
    raw({
      name: {
        type: String,
        minlength: DISH_CONSTANTS.DISH_LEN_STR.MIN_LENGTH,
        maxlength: DISH_CONSTANTS.DISH_LEN_STR.MAX_LENGTH,
      },
      canBeExcluded: { type: Boolean, default: false },
    }),
  ])
  ingredients: Ingredient[];

  @Expose()
  @Prop()
  allergens: Allergens[];

  @Expose()
  @Prop({
    required: true,
    min: DISH_CONSTANTS.DISH_NUMBER.MIN,
  })
  portionWeight: number;

  @Expose()
  @Type(() => NutritionalValue)
  @Prop(
    raw({
      per100g: {
        type: Number,
        min: 0,
      },
      perPortion: {
        type: Number,
        min: 0,
      },
    }),
  )
  calories: NutritionalValue;

  @Expose()
  @Type(() => NutritionalValue)
  @Prop(
    raw({
      per100g: {
        type: Number,
        min: 0,
      },
      perPortion: {
        type: Number,
        min: 0,
      },
    }),
  )
  fats: NutritionalValue;

  @Expose()
  @Type(() => NutritionalValue)
  @Prop(
    raw({
      per100g: {
        type: Number,
        min: 0,
      },
      perPortion: {
        type: Number,
        min: 0,
      },
    }),
  )
  proteins: NutritionalValue;

  @Expose()
  @Type(() => NutritionalValue)
  @Prop(
    raw({
      per100g: {
        type: Number,
        min: 0,
      },
      perPortion: {
        type: Number,
        min: 0,
      },
    }),
  )
  carbohydrates: NutritionalValue;

  @Expose()
  readonly id: string;
}

const DishSchema = SchemaFactory.createForClass(Dish);

export { Allergens, Dish, DISH_CONSTANTS, DishSchema, DishTags, Ingredient, MealType, NutritionalValue };
export type { DishDocument };
