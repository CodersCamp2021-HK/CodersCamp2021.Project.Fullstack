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
} from '../../../shared';
import { DishDto } from './DishDto';
import { DishListDto } from './DishListDto';

@ApiController({
  path: 'restaurants/:restaurantId/dishes',
  name: "Restaurant's dishes",
  description: "Operations on restaurant's dishes",
})
class RestaurantDishController {
  @ApiObjectIdParam({ name: 'restaurantId' })
  @ApiObjectIdParam()
  @ApiGet({ name: 'dish', response: DishDto })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findById(@Param('restaurantId') restaurantId: string, @Param('id') dishId: string) {
    const dish = null; // TODO: Hook up GetDishHandler, remove eslint-disable comment above
    if (!dish) return null;
    return plainToInstance(DishDto, dish);
  }

  @ApiObjectIdParam({ name: 'restaurantId' })
  @ApiList({ name: 'dishes', response: DishListDto, link: true })
  async list(
    @Param('restaurantId') restaurantId: string,
    @Pagination() pagination: PaginationQuery,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
  ) {
    const paginatedDishes = { data: [], pages: 1 }; // TODO: Hook up ListDishesHandler
    res.setHeader('Link', createPaginationLink(url, paginatedDishes.pages));
    return plainToInstance(DishListDto, paginatedDishes);
  }
}

export { RestaurantDishController };
