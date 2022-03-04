import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Restaurant, RestaurantDocument } from '../../restaurants/database';
import { Dish, DishDocument } from '../../restaurants/dishes/database';
import { Handler } from '../../shared';
import { DBImage, ImageType } from '../shared';

interface GetImageRequest {
  readonly type: ImageType;
  readonly id: string;
}

class GetImageHandler implements Handler<GetImageRequest, DBImage | null> {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
  ) {}

  private async getRestaurantLogo(id: string): Promise<DBImage | null> {
    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant?.logo) return null;
    return plainToInstance(DBImage, restaurant.logo);
  }

  private async getDishPhoto(id: string): Promise<DBImage | null> {
    const dish = await this.dishModel.findById(id);
    if (!dish?.photo) return null;
    return plainToInstance(DBImage, dish.photo);
  }

  async exec(req: GetImageRequest): Promise<DBImage | null> {
    switch (req.type) {
      case ImageType.RestaurantLogo:
        return this.getRestaurantLogo(req.id);
      case ImageType.DishPhoto:
        return this.getDishPhoto(req.id);
      default:
        return null;
    }
  }
}

export { GetImageHandler };
