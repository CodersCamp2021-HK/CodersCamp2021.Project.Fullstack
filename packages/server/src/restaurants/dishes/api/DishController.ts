import { Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { ApiController, ApiList, createPaginationLink, Pagination, PaginationQuery, Url } from '../../../shared';
import { ListAllDishesHandler } from '../domain/ListAllDishesHandler';
import { DishListDto } from './DishListDto';

@ApiController({
  path: 'dishes',
  name: 'All dishes',
  description: 'Operations on all dishes',
})
class DishController {
  constructor(private readonly listAllDishesHandler: ListAllDishesHandler) {}

  @ApiList({ name: 'dishes', response: DishListDto, link: true })
  async list(@Pagination() pagination: PaginationQuery, @Res({ passthrough: true }) res: Response, @Url() url: URL) {
    const paginatedDishes = await this.listAllDishesHandler.exec(pagination);
    res.setHeader('Link', createPaginationLink(url, paginatedDishes.pages));
    return plainToInstance(DishListDto, paginatedDishes);
  }
}

export { DishController };
