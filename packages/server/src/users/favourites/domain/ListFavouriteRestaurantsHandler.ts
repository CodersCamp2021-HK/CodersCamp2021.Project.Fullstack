import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Restaurant } from '../../../restaurants/database';
import { Handler, Paginated, PaginationQuery } from '../../../shared';
import { User, UserDocument } from '../../database';

interface ListFavouriteRestaurantsRequest extends PaginationQuery {
  readonly userId: string;
}

@Injectable()
class ListFavouriteRestaurantsHandler implements Handler<ListFavouriteRestaurantsRequest, Paginated<Restaurant>> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async exec(req: ListFavouriteRestaurantsRequest): Promise<Paginated<Restaurant>> {
    const offset = (req.page - 1) * req.limit;

    const user = await this.userModel.findById(req.userId).populate('favouriteRestaurants');
    const count = user?.favouriteRestaurants.length ?? 0;
    const restaurants = user?.favouriteRestaurants.slice(offset) ?? [];

    return { data: plainToInstance(Restaurant, restaurants), pages: Math.ceil(count / req.limit) };
  }
}

export { ListFavouriteRestaurantsHandler };
