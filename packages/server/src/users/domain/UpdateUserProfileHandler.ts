import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FavouriteRestaurantDto } from '../../restaurants/api/RestaurantDto';
import { FavouriteDishDto } from '../../restaurants/dishes/api/DishDto';
import { Handler } from '../../shared';
import { Card } from '../api/UserDto';
import { User, UserDocument } from '../database';

interface UpdateUserProfileRequest {
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly addressId: string[];
  readonly card: Card;
  readonly favouriteRestaurants: FavouriteRestaurantDto[];
  readonly favouriteDishes: FavouriteDishDto[];
  readonly orders: string[];
  readonly profileCompleted: boolean;
}

@Injectable()
class UpdateUserProfileHandler implements Handler<UpdateUserProfileRequest, null | undefined> {
  constructor(@InjectModel(User.name) private userModule: Model<UserDocument>) {}

  async exec(req: UpdateUserProfileRequest): Promise<null | undefined> {
    const result = await this.userModule.findOneAndUpdate({
      name: req.name,
      surname: req.surname,
      email: req.email,
      phoneNumber: req.phoneNumber,
      // addressId: req.addressId,
      card: req.card,
      // favouriteRestaurants: req.favouriteRestaurants,
      // favouriteDishes: req.favouriteDishes,
      // orders: req.orders,
      profileCompleted: req.profileCompleted,
    });
    if (result === null) return null;
    return undefined;
  }
}

export { UpdateUserProfileHandler };