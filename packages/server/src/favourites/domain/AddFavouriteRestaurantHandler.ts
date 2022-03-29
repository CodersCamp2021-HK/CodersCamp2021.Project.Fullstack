import { Injectable } from '@nestjs/common';

import { RestaurantsFacade } from '../../restaurants';
import { Handler } from '../../shared';
import { UsersFavFacade } from '../../users';

interface AddFavouriteRestaurantRequest {
  readonly userId: string;
  readonly restaurantId: string;
}

@Injectable()
class AddFavouriteRestaurantHandler implements Handler<AddFavouriteRestaurantRequest, undefined | null> {
  constructor(private readonly usersFavFacade: UsersFavFacade, private readonly restaurantFacade: RestaurantsFacade) {}

  async exec(req: AddFavouriteRestaurantRequest): Promise<undefined | null> {
    const restaurantExist = await this.restaurantFacade.exists(req.restaurantId);
    if (!restaurantExist) return null;

    await this.usersFavFacade.add(req.userId, 'favouriteRestaurants', req.restaurantId);

    return undefined;
  }
}

export { AddFavouriteRestaurantHandler };
