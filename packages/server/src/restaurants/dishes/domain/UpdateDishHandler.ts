import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Handler } from '../../../shared';
import { Restaurant, RestaurantDocument } from '../../database';
import { Allergens, Dish, DishDocument, DishTags, Ingredient, MealType, NutritionalValue } from '../database';

interface UpdateDishRequest {
  readonly dishId: string;
  readonly restaurantId: string;
  readonly name: string;
  // readonly mealType: MealType[];
  // readonly description: string;
  // readonly price: number;
  // readonly tags: DishTags[];
  // readonly ingredients: Ingredient[];
  // readonly allergens: Allergens[];
  // readonly portionWeight: number;
  // readonly calories: NutritionalValue;
  // readonly fats: NutritionalValue;
  // readonly proteins: NutritionalValue;
  // readonly carbohydrates: NutritionalValue;
  // readonly restaurant: string;
}
@Injectable()
class UpdateDishHandler implements Handler<UpdateDishRequest, null | undefined> {
  constructor(
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
  ) {}
  async exec(req: UpdateDishRequest): Promise<null | undefined> {
    const result = await this.restaurantModel.findOneAndUpdate(
      {
        dish: req.dishId,
        restaurant: req.restaurantId,
      },
      { name: req.name },
    );
    if (result === null) return null;

    return undefined;
  }
}

export { UpdateDishHandler };
