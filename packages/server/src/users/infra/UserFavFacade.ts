import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { Restaurant } from '../../restaurants/database';
import { Dish } from '../../restaurants/dishes/database';
import { User, UserDocument } from '../database';

type FavouriteCollection = ('favouriteDishes' | 'favouriteRestaurants') & keyof User;

class UsersFavFacade {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async add(userId: string, collection: FavouriteCollection, targetId: string) {
    await this.userModel.findByIdAndUpdate(userId, { $addToSet: { [collection]: new ObjectId(targetId) } });
  }

  async remove(userId: string, collection: FavouriteCollection, targetId: string) {
    const result = await this.userModel.updateOne({ _id: userId }, { $pull: { [collection]: targetId } });
    return result.modifiedCount !== 0;
  }

  async list(userId: string, collection: 'favouriteDishes'): Promise<Dish[]>;
  async list(userId: string, collection: 'favouriteRestaurants'): Promise<Restaurant[]>;
  async list(userId: string, collection: FavouriteCollection) {
    const user = await this.userModel.findById(userId).populate(collection);
    return user?.[collection] ?? [];
  }
}

export { UsersFavFacade };
