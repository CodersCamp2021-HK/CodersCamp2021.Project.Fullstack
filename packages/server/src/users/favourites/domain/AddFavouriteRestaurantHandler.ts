import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { RestaurantsFacade } from '../../../restaurants';
import { Handler } from '../../../shared';
import { User, UserDocument } from '../../database';

interface AddFavouriteRestaurantRequest {
  readonly userId: string;
  readonly restaurantId: string;
}

@Injectable()
class AddFavouriteRestaurantHandler implements Handler<AddFavouriteRestaurantRequest, undefined | null> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly restaurantFacade: RestaurantsFacade,
  ) {}

  async exec(req: AddFavouriteRestaurantRequest): Promise<undefined | null> {
    const restaurantExist = await this.restaurantFacade.exists(req.restaurantId);
    if (!restaurantExist) return null;

    await this.userModel.findByIdAndUpdate(req.userId, {
      $addToSet: { favouriteRestaurants: new ObjectId(req.restaurantId) },
    });

    return undefined;
  }
}

export { AddFavouriteRestaurantHandler };
