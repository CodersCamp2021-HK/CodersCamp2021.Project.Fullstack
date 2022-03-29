import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Restaurant } from '../../restaurants/database';
import { Handler, Paginated, PaginationQuery } from '../../shared';
import { UsersFavFacade } from '../../users';

interface ListFavouriteRestaurantsRequest extends PaginationQuery {
  readonly userId: string;
}

@Injectable()
class ListFavouriteRestaurantsHandler implements Handler<ListFavouriteRestaurantsRequest, Paginated<Restaurant>> {
  constructor(private readonly usersFavFacade: UsersFavFacade) {}

  async exec(req: ListFavouriteRestaurantsRequest): Promise<Paginated<Restaurant>> {
    const offset = (req.page - 1) * req.limit;

    const list = await this.usersFavFacade.list(req.userId, 'favouriteRestaurants');

    return { data: plainToInstance(Restaurant, list.slice(offset)), pages: Math.ceil(list.length / req.limit) };
  }
}

export { ListFavouriteRestaurantsHandler };
