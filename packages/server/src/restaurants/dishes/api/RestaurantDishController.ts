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
  QueryFilters,
  Url,
} from '../../../shared';
import { DishTags, MealType } from '../database';
import { DishFilters, ListDishesHandler } from '../domain';
import { DishListDto } from './DishListDto';

@ApiController({
  path: 'restaurants/:restaurantId/dishes',
  name: "Restaurant's dishes",
  description: "Operations on restaurant's dishes",
})
class RestaurantDishController {
  constructor(private readonly listDishesHandler: ListDishesHandler) {}

  @ApiObjectIdParam({ name: 'restaurantId' })
  @ApiList({ name: 'dishes', response: DishListDto, link: true })
  async list(
    @Param('restaurantId') restaurantId: string,
    @Pagination() pagination: PaginationQuery,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
    @QueryFilters([
      { name: 'city', required: false },
      { name: 'mealType', required: false, enum: MealType, enumName: 'MealTypeEnum', isArray: true },
      { name: 'tags', required: false, enum: DishTags, enumName: 'DishTagEnum', isArray: true },
    ])
    filters: DishFilters,
  ) {
    const paginatedDishes = await this.listDishesHandler.exec({ ...pagination, ...filters, restaurantId });
    res.setHeader('Link', createPaginationLink(url, paginatedDishes.pages));
    return plainToInstance(DishListDto, paginatedDishes);
  }
}

export { RestaurantDishController };
