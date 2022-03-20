import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Restaurant, RestaurantDocument } from '../database';

class RestaurantsFacade {
  constructor(@InjectModel(Restaurant.name) private readonly restaurantModel: Model<RestaurantDocument>) {}

  async create() {
    const restaurantDoc = await this.restaurantModel.create({});
    const restaurant = plainToInstance(Restaurant, restaurantDoc);
    return restaurant.id;
  }

  async findById(id: string) {
    return this.restaurantModel.findById(id);
  }
}

export { RestaurantsFacade };
