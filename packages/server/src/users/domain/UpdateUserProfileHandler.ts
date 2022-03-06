import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Address } from '../../addresses/database/AddressSchema';
import { Order } from '../../orders/database/OrderSchema';
import { Restaurant } from '../../restaurants/database/RestaurantSchema';
import { Dish } from '../../restaurants/dishes/database/DishesSchema';
import { Handler } from '../../shared';
import { Card, User, UserDocument } from '../database';

interface UpdateUserProfileRequest {
  readonly id: string;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly addressId: Address[];
  readonly card: Card;
  readonly favouriteRestaurants: Restaurant[];
  readonly favouriteDishes: Dish[];
  readonly orders: Order[];
  readonly profileCompleted: boolean;
}

@Injectable()
class UpdateUserProfileHandler implements Handler<UpdateUserProfileRequest, null | undefined> {
  constructor(@InjectModel(User.name) private userModule: Model<UserDocument>) {}

  async exec(req: UpdateUserProfileRequest): Promise<null | undefined> {
    const result = await this.userModule.findOneAndUpdate(
      { _id: req.id },
      {
        name: req.name,
        surname: req.surname,
        email: req.email,
        phoneNumber: req.phoneNumber,
        // addressId: req.addressId,
        card: req.card,
        // favouriteRestaurants: req.favouriteRestaurants,
        // favouriteDishes: req.favouriteDishes,
        // orders: req.orders,
        // profileCompleted: req.profileCompleted,
      },
    );

    if (result === null) return null;
    return undefined;
  }
}

export { UpdateUserProfileHandler };
