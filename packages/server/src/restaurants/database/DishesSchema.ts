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

enum Ingredients {
  Onion = 'cebula',
  tomato = 'pomidor',
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
  @Prop({ required: true })
  name: string;

  @Expose()
  @Prop({ type: [{ enum: MealType }] })
  mealType: string[];

  @Expose()
  @Prop()
  description: string;

  @Expose()
  @Prop({
    required: true,
  })
  price: mongoose.Decimal128;

  @Expose()
  @Prop()
  photo: Buffer;

  @Expose()
  @Prop({ type: [{ enum: DishTags }] })
  tags: string[];

  @Expose()
  @Prop(
    raw({
      name: { type: [{ enum: Ingredients }] },
      canBeExcluded: { type: Boolean, default: false },
    }),
  )
  ingredients: object[];

  @Expose()
  @Prop({ type: [{ enum: Allergens }] })
  allergens: string[];

  @Expose()
  @Prop()
  portionWeight: number;

  @Expose()
  @Prop({ required: true })
  calories: number;

  @Expose()
  @Prop(
    raw({
      per100g: { type: Number, required: true },
      perPortion: Number,
    }),
  )
  fats: {};

  @Expose()
  @Prop(
    raw({
      per100g: { type: Number, required: true },
      perPortion: Number,
    }),
  )
  proteins: {};

  @Expose()
  @Prop(
    raw({
      per100g: { type: Number, required: true },
      perPortion: Number,
    }),
  )
  carbohydrates: {};

  @Expose()
  readonly id: string;
}

const DishSchema = SchemaFactory.createForClass(Dish);

export { Dish, DishSchema };
export type { DishDocument };
