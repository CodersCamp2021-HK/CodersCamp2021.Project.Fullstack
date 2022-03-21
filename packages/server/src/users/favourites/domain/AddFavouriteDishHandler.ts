import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { DishesFacade } from '../../../restaurants';
import { Handler } from '../../../shared';
import { User, UserDocument } from '../../database';

interface AddFavouriteDishRequest {
  readonly userId: string;
  readonly dishId: string;
}

@Injectable()
class AddFavouriteDishHandler implements Handler<AddFavouriteDishRequest, undefined | null> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly dishesFacade: DishesFacade,
  ) {}

  async exec(req: AddFavouriteDishRequest): Promise<undefined | null> {
    const dishExists = await this.dishesFacade.exists(req.dishId);
    if (!dishExists) return null;

    await this.userModel.findByIdAndUpdate(req.userId, { $addToSet: { favouriteDishes: new ObjectId(req.dishId) } });

    return undefined;
  }
}

export { AddFavouriteDishHandler };
