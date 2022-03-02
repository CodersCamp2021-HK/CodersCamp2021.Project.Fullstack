import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Restaurant, RestaurantDocument } from '../database';

interface GetRestaurantRequest {
  readonly id: string;
}

class GetRestaurantHandler implements Handler<GetRestaurantRequest, Restaurant | null> {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

  async exec(req: GetRestaurantRequest): Promise<Restaurant | null> {
    const restaurant = await this.restaurantModel.findById(req.id);
    if (!restaurant || !restaurant?.profileCompleted) return null;
    return plainToInstance(Restaurant, restaurant);
  }
}

export { GetRestaurantHandler };
