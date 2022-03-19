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
class RemoveFavouriteRestaurantHandler implements Handler<RemoveFavouriteRestaurantRequest, void> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async exec(req: RemoveFavouriteRestaurantRequest): Promise<void> {
    await this.userModel.findByIdAndUpdate(req.userId, { $pull: { favouriteRestaurants: req.restaurantId } });
  }
}

export { RemoveFavouriteRestaurantHandler };
