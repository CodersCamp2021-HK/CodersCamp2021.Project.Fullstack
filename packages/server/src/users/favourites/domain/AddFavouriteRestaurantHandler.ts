import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { RestaurantsFacade } from '../../../restaurants';
import { Restaurant } from '../../../restaurants/database';
import { Handler } from '../../../shared';
import { User, UserDocument } from '../../database';

interface AddFavouriteRestaurantRequest {
  readonly userId: string;
  readonly restaurantId: string;
}

@Injectable()
class AddFavouriteRestaurantHandler implements Handler<AddFavouriteRestaurantRequest, Restaurant | null> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly restaurantFacade: RestaurantsFacade,
  ) {}

  async exec(req: AddFavouriteRestaurantRequest): Promise<Restaurant | null> {
    const restaurant = await this.restaurantFacade.findById(req.restaurantId);
    if (!restaurant) return null;

    await this.userModel.findByIdAndUpdate(req.userId, { $addToSet: { favouriteRestaurants: restaurant } });

    return plainToInstance(Restaurant, restaurant);
  }
}

export { AddFavouriteRestaurantHandler };
