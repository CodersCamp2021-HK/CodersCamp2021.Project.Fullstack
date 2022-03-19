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
  ParamDishFilters,
  Url,
} from '../../../shared';
import { DishFilters, GetDishHandler, ListDishesHandler } from '../domain';
import { DishDto } from './DishDto';
import { DishListDto } from './DishListDto';

@ApiController({
  path: 'dishes',
  name: 'Dishes',
  description: 'Operations on dishes',
})
class DishController {
  constructor(private readonly listDishesHandler: ListDishesHandler, private readonly getDishHandler: GetDishHandler) {}

  @ApiObjectIdParam()
  @ApiGet({ name: 'dish', response: DishDto })
  async findDishById(@Param('id') dishId: string) {
    const dish = await this.getDishHandler.exec({ dishId });
    if (!dish) return null;
    return plainToInstance(DishDto, dish);
  }

  @ApiList({ name: 'dishes', response: DishListDto, link: true })
  async listAllDishes(
    @Pagination() pagination: PaginationQuery,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
    @ParamDishFilters() filters: DishFilters,
  ) {
    const paginatedDishes = await this.listDishesHandler.exec({ ...pagination, ...filters });
    res.setHeader('Link', createPaginationLink(url, paginatedDishes.pages));
    return plainToInstance(DishListDto, paginatedDishes);
  }
}

export { DishController };
