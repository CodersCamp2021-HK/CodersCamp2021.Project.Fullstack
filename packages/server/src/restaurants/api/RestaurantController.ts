import { Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import {
  ApiController,
  ApiGet,
  ApiList,
  ApiObjectIdParam,
  createPaginationLink,
  Pagination,
  PaginationQuery,
  Url,
} from '../../shared';
import { RestaurantDto } from './RestaurantDto';
import { RestaurantListDto } from './RestaurantListDto';

@ApiController({ path: 'restaurants', name: 'Restaurants', description: 'Operations on restaurants' })
class RestaurantController {
  @ApiObjectIdParam()
  @ApiGet({ name: 'restaurant', response: RestaurantDto })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findById(@Param('id') id: string) {
    const restaurant = null; // TODO: Hook up GetRestaurantHandler, remove eslint-disable comment above
    if (!restaurant) return null;
    return plainToInstance(RestaurantDto, restaurant);
  }

  @ApiList({ name: 'restaurants', response: RestaurantListDto, link: true })
  async list(@Pagination() pagination: PaginationQuery, @Res({ passthrough: true }) res: Response, @Url() url: URL) {
    const paginatedRestaurants = { data: [], pages: 1 }; // TODO: Hook up ListRestaurantsHandler
    res.setHeader('Link', createPaginationLink(url, paginatedRestaurants.pages));
    return plainToInstance(RestaurantListDto, paginatedRestaurants);
  }
}

export { RestaurantController };
