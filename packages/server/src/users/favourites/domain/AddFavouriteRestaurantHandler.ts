import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Restaurant, RestaurantDocument } from '../../../restaurants/database';
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
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async exec(req: AddFavouriteRestaurantRequest): Promise<Restaurant | null> {
    const restaurant = await this.restaurantModel.findById(req.restaurantId);
    if (!restaurant) return null;

    await this.userModel.findByIdAndUpdate(req.userId, { $push: { favouriteRestaurants: restaurant } });

    return plainToInstance(Restaurant, restaurant);
  }
}

export { AddFavouriteRestaurantHandler };
