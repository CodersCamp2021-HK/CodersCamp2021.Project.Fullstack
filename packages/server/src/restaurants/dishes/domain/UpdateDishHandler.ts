import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { NOTFOUND } from 'dns';
import _, { update } from 'lodash';
import { Model } from 'mongoose';

import { Handler } from '../../../shared';
import { Restaurant, RestaurantDocument } from '../../database';
import { Allergens, Dish, DishDocument, DishTags, Ingredient, MealType, NutritionalValue } from '../database';

interface UpdateDishRequest {
  readonly dishId: string;
  readonly restaurant: string;
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
  readonly updated: boolean;
}

@Injectable()
class UpdateDishHandler implements Handler<UpdateDishRequest, undefined | null> {
  constructor(
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
  ) {}
  async exec(req: UpdateDishRequest): Promise<undefined | null> {
    //usuwanie dishId z restaurant.dishes
    await this.restaurantModel.updateOne({ _id: req.restaurant }, { $pull: { dishes: req.dishId } });

    //update dania
    // const result = await this.dishModel.findOneAndUpdate(
    //   { _id: req.dishId, restaurant: req.restaurant },
    //   _.omit(req, 'dishId', 'restaurantId'),
    // );
    // if (result === null) return null;
    const created = await this.dishModel.create(req);
    plainToInstance(Dish, created);
    //dodanie flagi do starego dish
    await this.dishModel.findOneAndUpdate({ _id: req.dishId, restaurant: req.restaurant }, { updated: true });
    //dodac nowy dish do restauran.dishes
    await this.restaurantModel.findByIdAndUpdate(req.restaurant, { $push: { dishes: created } });

    return undefined;
  }
}

export { UpdateDishHandler };
