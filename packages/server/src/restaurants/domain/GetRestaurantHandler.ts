import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Restaurant, RestaurantDocument } from '../database';

interface GetRestaurantRequest {
  readonly id: string;
  readonly profileMustBeCompleted?: boolean;
}

class GetRestaurantHandler implements Handler<GetRestaurantRequest, Restaurant | null> {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

  async exec({ id, profileMustBeCompleted = true }: GetRestaurantRequest): Promise<Restaurant | null> {
    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant || (profileMustBeCompleted && !restaurant?.isCompleted)) return null;
    return plainToInstance(Restaurant, restaurant);
  }
}

export { GetRestaurantHandler };
