import { Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import {
  ApiController,
  ApiList,
  ApiObjectIdParam,
  createPaginationLink,
  Pagination,
  PaginationQuery,
  Url,
} from '../../../shared';
import { ListPartnerDishesHandler } from '../domain';
import { DishListDto } from './DishListDto';

@ApiController({
  path: 'restaurants/:restaurantId/dishes',
  name: "Restaurant's dishes",
  description: "Operations on restaurant's dishes",
})
class RestaurantDishController {
  constructor(private readonly listDishesHandler: ListPartnerDishesHandler) {}

  @ApiObjectIdParam({ name: 'restaurantId' })
  @ApiList({ name: 'dishes', response: DishListDto, link: true })
  async list(
    @Param('restaurantId') partnerId: string,
    @Pagination() { page, limit }: PaginationQuery,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
  ) {
    const paginatedDishes = await this.listDishesHandler.exec({ page, limit, partnerId });
    res.setHeader('Link', createPaginationLink(url, paginatedDishes.pages));
    return plainToInstance(DishListDto, paginatedDishes);
  }
}

export { RestaurantDishController };
