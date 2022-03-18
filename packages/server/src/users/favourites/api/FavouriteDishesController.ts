import { Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { FavouriteDishDto } from '../../../restaurants/dishes/api/DishDto';
import {
  ApiAuthorization,
  ApiController,
  ApiList,
  ApiObjectIdParam,
  ApiUpdate,
  createPaginationLink,
  Pagination,
  PaginationQuery,
  Role,
  Url,
  UserId,
} from '../../../shared';
import { AddFavouriteDishHandler, ListFavouriteDishesHandler } from '../domain';
import { FavouriteDishListDto } from './FavouriteDishListDto';

@ApiController({
  path: 'users/favourite/dishes',
  name: "User's favourite dishes",
  description: "Operations on user's favourite dishes",
})
class FavouriteDishesController {
  constructor(
    private readonly listFavouriteDishesHandler: ListFavouriteDishesHandler,
    private readonly addFavouriteDishHandler: AddFavouriteDishHandler,
  ) {}

  @ApiList({ name: 'dishes', response: FavouriteDishListDto, link: true })
  @ApiAuthorization(Role.User)
  async list(
    @UserId() userId,
    @Pagination() pagination: PaginationQuery,
    @Res({ passthrough: true }) resp: Response,
    @Url() url: URL,
  ) {
    const paginatedDishes = await this.listFavouriteDishesHandler.exec({ ...pagination, userId });
    resp.setHeader('Link', createPaginationLink(url, paginatedDishes.pages));
    return plainToInstance(FavouriteDishListDto, paginatedDishes);
  }

  @ApiObjectIdParam()
  @ApiUpdate({ name: 'dish', response: FavouriteDishDto })
  @ApiAuthorization(Role.User)
  async add(@UserId() userId: string, @Param('id') dishId: string) {
    const dish = await this.addFavouriteDishHandler.exec({ userId, dishId });
    return plainToInstance(FavouriteDishDto, dish);
  }
}

export { FavouriteDishesController };
