import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../../shared';
import { Allergens, Dish, DishDocument, DishTags, Ingredient, MealType, NutritionalValue } from '../database';

interface CreateDishRequest {
  readonly name: string;
  readonly mealType: MealType[];
  readonly description: string;
  readonly price: number;
  readonly tags: DishTags[];
  readonly ingredients: Ingredient[];
  readonly allergens: Allergens[];
  readonly portionWeight: number;
  readonly calories: NutritionalValue;
  readonly fats: NutritionalValue;
  readonly proteins: NutritionalValue;
  readonly carbohydrates: NutritionalValue;
}

@Injectable()
class CreateDishHandler implements Handler<CreateDishRequest, Dish> {
  constructor(@InjectModel(Dish.name) private dishModel: Model<DishDocument>) {}

  async exec(req: CreateDishRequest): Promise<Dish> {
    const created = await this.dishModel.create({ ...req });
    return plainToInstance(Dish, created);
  }
}

export { CreateDishHandler };
