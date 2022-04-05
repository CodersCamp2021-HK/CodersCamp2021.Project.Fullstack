import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Dish } from '../../restaurants/dishes/database';
import { Handler, Paginated, PaginationQuery } from '../../shared';
import { UsersFavFacade } from '../../users';

interface ListFavouriteDishesRequest extends PaginationQuery {
  readonly userId: string;
}

@Injectable()
class ListFavouriteDishesHandler implements Handler<ListFavouriteDishesRequest, Paginated<Dish>> {
  constructor(private readonly usersFavFacade: UsersFavFacade) {}

  async exec(req: ListFavouriteDishesRequest): Promise<Paginated<Dish>> {
    const offset = (req.page - 1) * req.limit;

    const list = await this.usersFavFacade.list(req.userId, 'favouriteDishes');

    return { data: plainToInstance(Dish, list.slice(offset)), pages: Math.ceil(list.length / req.limit) };
  }
}

export { ListFavouriteDishesHandler };
