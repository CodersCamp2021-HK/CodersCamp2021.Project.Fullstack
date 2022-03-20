import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { DishesFacade } from '../../../restaurants';
import { Dish } from '../../../restaurants/dishes/database';
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
    private readonly dishesFacade: DishesFacade,
  ) {}

  async exec(req: AddFavouriteDishRequest): Promise<Dish | null> {
    const dish = await this.dishesFacade.findById(req.dishId);
    if (!dish) return null;

    await this.userModel.findByIdAndUpdate(req.userId, { $addToSet: { favouriteDishes: dish } });

    return plainToInstance(Dish, dish);
  }
}

export { AddFavouriteDishHandler };
