import { Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import {
  ApiAuthorization,
  ApiController,
  ApiDelete,
  ApiList,
  ApiObjectIdParam,
  ApiUpdate,
  createPaginationLink,
  Pagination,
  PaginationQuery,
  Role,
  Url,
  UserId,
} from '../../shared';
import {
  AddFavouriteRestaurantHandler,
  ListFavouriteRestaurantsHandler,
  RemoveFavouriteRestaurantHandler,
} from '../domain';
import { FavouriteRestaurantDto, FavouriteRestaurantListDto } from './FavouriteDtos';

@ApiController({
  path: 'users/favourite/restaurants',
  name: "User's favourite restaurants",
  description: "Operations on user's favourite restaurants",
})
class FavouriteRestaurantsController {
  constructor(
    private readonly addFavouriteRestaurantHandler: AddFavouriteRestaurantHandler,
    private readonly removeFavouriteRestaurantHandler: RemoveFavouriteRestaurantHandler,
    private readonly listFavouriteRestaurantsHandler: ListFavouriteRestaurantsHandler,
  ) {}

  @ApiObjectIdParam()
  @ApiAuthorization(Role.User)
  @ApiUpdate({ name: 'restaurant', response: FavouriteRestaurantDto })
  async add(@UserId() userId: string, @Param('id') restaurantId: string) {
    const restaurant = await this.addFavouriteRestaurantHandler.exec({ userId, restaurantId });
    return plainToInstance(FavouriteRestaurantDto, restaurant);
  }

  @ApiObjectIdParam()
  @ApiAuthorization(Role.User)
  @ApiDelete({ name: 'restaurant' })
  async remove(@UserId() userId: string, @Param('id') restaurantId: string) {
    return this.removeFavouriteRestaurantHandler.exec({ userId, restaurantId });
  }

  @ApiList({ name: 'restaurants', response: FavouriteRestaurantListDto, link: true })
  @ApiAuthorization(Role.User)
  async list(
    @UserId() userId,
    @Pagination() pagination: PaginationQuery,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
  ) {
    const paginatedRestaurants = await this.listFavouriteRestaurantsHandler.exec({ ...pagination, userId });
    res.setHeader('Link', createPaginationLink(url, paginatedRestaurants.pages));
    return plainToInstance(FavouriteRestaurantListDto, paginatedRestaurants);
  }
}

export { FavouriteRestaurantsController };
