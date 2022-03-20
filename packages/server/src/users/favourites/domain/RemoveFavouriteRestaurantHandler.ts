import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Handler } from '../../../shared';
import { User, UserDocument } from '../../database';

interface RemoveFavouriteRestaurantRequest {
  readonly userId: string;
  readonly restaurantId: string;
}

@Injectable()
class RemoveFavouriteRestaurantHandler implements Handler<RemoveFavouriteRestaurantRequest, null | undefined> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async exec(req: RemoveFavouriteRestaurantRequest): Promise<null | undefined> {
    const user = await this.userModel
      .findByIdAndUpdate(req.userId, { $pull: { favouriteRestaurants: req.restaurantId } })
      .populate('favouriteRestaurants');

    if (!user?.favouriteRestaurants.some((restaurant) => restaurant.id === req.restaurantId)) return null;
    return undefined;
  }
}

export { RemoveFavouriteRestaurantHandler };
