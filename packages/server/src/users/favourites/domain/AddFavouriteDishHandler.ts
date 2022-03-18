import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Dish, DishDocument } from '../../../restaurants/dishes/database';
import { Handler } from '../../../shared';
import { User, UserDocument } from '../../database';

interface AddFavouriteDishRequest {
  readonly userId: string;
  readonly dishId: string;
}

@Injectable()
class AddFavouriteDishHandler implements Handler<AddFavouriteDishRequest, Dish | null> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
  ) {}

  async exec(req: AddFavouriteDishRequest): Promise<Dish | null> {
    const dish = await this.dishModel.findById(req.dishId);
    if (!dish) return null;

    await this.userModel.findByIdAndUpdate(req.userId, { $addToSet: { favouriteDishes: dish } });

    return plainToInstance(Dish, dish);
  }
}

export { AddFavouriteDishHandler };
