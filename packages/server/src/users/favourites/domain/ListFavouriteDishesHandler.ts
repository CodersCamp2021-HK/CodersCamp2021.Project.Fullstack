import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Dish } from '../../../restaurants/dishes/database';
import { Handler, Paginated, PaginationQuery } from '../../../shared';
import { User, UserDocument } from '../../database';

interface ListFavouriteDishesRequest extends PaginationQuery {
  readonly userId: string;
}

@Injectable()
class ListFavouriteDishesHandler implements Handler<ListFavouriteDishesRequest, Paginated<Dish>> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async exec(req: ListFavouriteDishesRequest): Promise<Paginated<Dish>> {
    const offset = (req.page - 1) * req.limit;

    const user = await this.userModel.findById(req.userId).populate('favouriteDishes');
    const count = user?.favouriteDishes.length ?? 0;
    const dishes = user?.favouriteDishes.slice(offset) ?? [];

    return { data: plainToInstance(Dish, dishes), pages: Math.ceil(count / req.limit) };
  }
}

export { ListFavouriteDishesHandler };
