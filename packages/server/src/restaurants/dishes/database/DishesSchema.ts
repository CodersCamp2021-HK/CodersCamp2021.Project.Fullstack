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
  DISH_LEN_NUMBER: Object.freeze({
    MIN_LENGTH: 0,
  }),
});

const MacroSchema = raw({
  per100g: {
    type: Number,
    required: true,
    min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
  },
  perPortion: Number,
  min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
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
    min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
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
    min: DISH_CONSTANTS.DISH_LEN_NUMBER.MIN_LENGTH,
  })
  portionWeight: number;

  @Expose()
  @Prop({
    required: true,
  })
  calories: number;

  @Expose()
  @Prop(MacroSchema)
  fats: object;

  @Expose()
  @Prop(MacroSchema)
  proteins: object;

  @Expose()
  @Prop(MacroSchema)
  carbohydrates: object;

  @Expose()
  readonly id: string;
}

const DishSchema = SchemaFactory.createForClass(Dish);

export { Dish, DISH_CONSTANTS, DishSchema };
export type { DishDocument };
