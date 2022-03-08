import { Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { ApiController, ApiList, createPaginationLink, Pagination, PaginationQuery, Url } from '../../../shared';
import { FavouriteDishListDto } from './FavouriteDishListDto';

@ApiController({
  path: 'users/favourite/dishes',
  name: "User's favourite dishes",
  description: "Operations on user's favourite dishes",
})
class FavouriteDishListController {
  @ApiList({ name: 'dishes', response: FavouriteDishListDto, link: true })
  async listFavouriteDishes(
    @Pagination() pagination: PaginationQuery,
    @Res({ passthrough: true }) resp: Response,
    @Url() url: URL,
  ) {
    const paginatedDishes = { data: [], pages: 1 };
    resp.setHeader('Link', createPaginationLink(url, paginatedDishes.pages));
    return plainToInstance(FavouriteDishListDto, paginatedDishes);
  }
}

export { FavouriteDishListController };
