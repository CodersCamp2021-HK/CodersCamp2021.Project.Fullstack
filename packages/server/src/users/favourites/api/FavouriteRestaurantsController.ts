import { Param } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FavouriteRestaurantDto } from '../../../restaurants/api/RestaurantDto';
import { ApiAuthorization, ApiController, ApiDelete, ApiObjectIdParam, ApiUpdate, Role, UserId } from '../../../shared';
import { AddFavouriteRestaurantHandler, RemoveFavouriteRestaurantHandler } from '../domain';

@ApiController({
  path: 'users/favourite/restaurants',
  name: "User's favourite restaurants",
  description: "Operations on user's favourite restaurants",
})
class FavouriteRestaurantsController {
  constructor(
    private readonly addFavouriteRestaurantHandler: AddFavouriteRestaurantHandler,
    private readonly removeFavouriteRestaurantHandler: RemoveFavouriteRestaurantHandler,
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
  async deleteOne(@UserId() userId: string, @Param('id') restaurantId: string) {
    return this.removeFavouriteRestaurantHandler.exec({ userId: userId, restaurantId: restaurantId });
  }
}

export { FavouriteRestaurantsController };
