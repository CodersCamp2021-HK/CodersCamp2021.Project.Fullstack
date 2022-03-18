import { Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import {
  ApiAuthorization,
  ApiController,
  ApiList,
  createPaginationLink,
  Pagination,
  PaginationQuery,
  Role,
  Url,
  UserId,
} from '../../../shared';
import { ListFavouriteDishesHandler } from '../domain';
import { FavouriteDishListDto } from './FavouriteDishListDto';

@ApiController({
  path: 'users/favourite/dishes',
  name: "User's favourite dishes",
  description: "Operations on user's favourite dishes",
})
class FavouriteDishesController {
  constructor(private readonly listFavouriteDishesHandler: ListFavouriteDishesHandler) {}

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
}

export { FavouriteDishesController };
