import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Handler } from '../../../shared';
import { User, UserDocument } from '../../database';

interface RemoveFavouriteDishRequest {
  readonly userId: string;
  readonly dishId: string;
}

@Injectable()
class RemoveFavouriteDishHandler implements Handler<RemoveFavouriteDishRequest, null | undefined> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async exec(req: RemoveFavouriteDishRequest): Promise<null | undefined> {
    const user = await this.userModel
      .findByIdAndUpdate(req.userId, { $pull: { favouriteDishes: req.dishId } })
      .populate('favouriteDishes');

    if (!user?.favouriteDishes.some((dish) => dish.id === req.dishId)) return null;
    return undefined;
  }
}

export { RemoveFavouriteDishHandler };
