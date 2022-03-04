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
import { GetRestaurantHandler, ListRestaurantsHandler, UpdateRestaurantHandler } from '../domain/';
import { RestaurantDto, UpdateRestaurantDto } from './RestaurantDto';
import { RestaurantListDto } from './RestaurantListDto';

@ApiController({ path: 'restaurants', name: 'Restaurants', description: 'Operations on restaurants' })
class RestaurantController {
  constructor(
    private readonly getRestaurantHandler: GetRestaurantHandler,
    private readonly updateRestaurantHandler: UpdateRestaurantHandler,
    private readonly listRestaurantsHandler: ListRestaurantsHandler,
  ) {}

  @ApiObjectIdParam()
  @ApiGet({ name: 'restaurant', response: RestaurantDto })
  async findById(@Param('id') id: string) {
    const restaurant = await this.getRestaurantHandler.exec({ id });
    if (!restaurant) return null;
    return plainToInstance(RestaurantDto, restaurant);
  }

  @ApiList({ name: 'restaurants', response: RestaurantListDto, link: true })
  async list(@Pagination() pagination: PaginationQuery, @Res({ passthrough: true }) res: Response, @Url() url: URL) {
    const paginatedRestaurants = await this.listRestaurantsHandler.exec(pagination);
    res.setHeader('Link', createPaginationLink(url, paginatedRestaurants.pages));
    return plainToInstance(RestaurantListDto, paginatedRestaurants);
  }

  @ApiObjectIdParam()
  @ApiUpdate({ name: 'restaurant' })
  async update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.updateRestaurantHandler.exec({ id, ...updateRestaurantDto });
  }
}

export { RestaurantController };
