import { Injectable } from '@nestjs/common';

import { Handler } from '../../shared';
import { UsersFavFacade } from '../../users';

interface RemoveFavouriteRestaurantRequest {
  readonly userId: string;
  readonly restaurantId: string;
}

@Injectable()
class RemoveFavouriteRestaurantHandler implements Handler<RemoveFavouriteRestaurantRequest, null | undefined> {
  constructor(private readonly usersFavFacade: UsersFavFacade) {}

  async exec(req: RemoveFavouriteRestaurantRequest): Promise<null | undefined> {
    const success = await this.usersFavFacade.remove(req.userId, 'favouriteRestaurants', req.restaurantId);
    return success ? undefined : null;
  }
}

export { RemoveFavouriteRestaurantHandler };
