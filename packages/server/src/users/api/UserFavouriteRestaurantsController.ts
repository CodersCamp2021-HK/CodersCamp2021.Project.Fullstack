import { Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { ApiController, ApiList, createPaginationLink, Pagination, PaginationQuery, Url } from '../../shared';
import { UserFavouriteRestaurantsDto } from './UserFavouriteRestaurantsListDto';

@ApiController({
  path: 'users',
  name: 'Favourite restaurants',
  description: 'Operations on favourite restaurants',
})
class UserFavouriteRestaurantsController {
  @ApiList({ name: 'restaurants', response: UserFavouriteRestaurantsDto, link: true })
  async list(@Pagination() pagination: PaginationQuery, @Res({ passthrough: true }) resp: Response, @Url() url: URL) {
    const paginatedRestaurants = { pages: 1 };
    resp.setHeader('Link', createPaginationLink(url, paginatedRestaurants.pages));
    return plainToInstance(UserFavouriteRestaurantsDto, paginatedRestaurants);
  }
}

export { UserFavouriteRestaurantsController };
