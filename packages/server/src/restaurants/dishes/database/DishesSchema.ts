import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

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

const MacroSchema = raw({
  per100g: {
    type: Number,
    min: DISH_CONSTANTS.DISH_NUMBER.MIN,
  },
  perPortion: {
    type: Number,
    min: DISH_CONSTANTS.DISH_NUMBER.MIN,
  },
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
  @Prop()
  photo: Buffer;

  @Expose()
  @Prop()
  tags: DishTags[];

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
  @Prop()
  allergens: Allergens[];

  @Expose()
  @Prop({
    required: true,
    min: DISH_CONSTANTS.DISH_NUMBER.MIN,
  })
  portionWeight: number;

  @Expose()
  @Prop({
    type: MacroSchema,
    required: true,
  })
  calories: object;

  @Expose()
  @Prop({
    type: MacroSchema,
    required: true,
  })
  fats: object;

  @Expose()
  @Prop({
    type: MacroSchema,
    required: true,
  })
  proteins: object;

  @Expose()
  @Prop({
    type: MacroSchema,
    required: true,
  })
  carbohydrates: object;

  @Expose()
  readonly id: string;
}

const DishSchema = SchemaFactory.createForClass(Dish);

export { Allergens, Dish, DISH_CONSTANTS, DishSchema, DishTags, MealType };
export type { DishDocument };
