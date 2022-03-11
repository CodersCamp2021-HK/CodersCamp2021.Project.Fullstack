import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Handler } from '../../../shared';
import { Dish, DishDocument } from '../database';
import { Restaurant, RestaurantDocument } from '../../database';

interface DeleteDishRequest {
  readonly id: string;
  readonly restaurantId: string;
}

@Injectable()
class DeleteDishHandler implements Handler<DeleteDishRequest, null | undefined> {
  constructor(
      @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
      @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

  async exec(req: DeleteDishRequest): Promise<null | undefined> {
    await this.restaurantModel.updateOne(
        { _id: req.restaurantId},
        { $pull: {dishes: req.id } }
    )

    const result = await this.dishModel.deleteOne({ _id: req.id, restaurant: req.restaurantId });
    if (result.deletedCount !== 1) return null;
    return undefined;
  }
}

export { DeleteDishHandler };
