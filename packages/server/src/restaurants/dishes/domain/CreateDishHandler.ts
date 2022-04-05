import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../../shared';
import { Restaurant, RestaurantDocument } from '../../database';
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
  readonly restaurant: string;
  readonly updated: boolean;
}

@Injectable()
class CreateDishHandler implements Handler<CreateDishRequest, Dish | null> {
  constructor(
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async exec(req: CreateDishRequest): Promise<Dish | null> {
    const restaurant = await this.restaurantModel.findById(req.restaurant);
    if (!restaurant) return null;
    if (!restaurant.isCompleted) throw new UnprocessableEntityException('Profile not completed');

    const created = await this.dishModel.create(req);
    await this.restaurantModel.findByIdAndUpdate(req.restaurant, { $push: { dishes: created } });
    return plainToInstance(Dish, created);
  }
}

export { CreateDishHandler };
