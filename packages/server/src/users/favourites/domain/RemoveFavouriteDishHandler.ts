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
    const result = await this.userModel.updateOne({ _id: req.userId }, { $pull: { favouriteDishes: req.dishId } });

    if (result.modifiedCount === 0) return null;
    return undefined;
  }
}

export { RemoveFavouriteDishHandler };
