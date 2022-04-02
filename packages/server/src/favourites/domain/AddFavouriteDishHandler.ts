import { Injectable } from '@nestjs/common';

import { DishesFacade } from '../../restaurants';
import { Handler } from '../../shared';
import { UsersFavFacade } from '../../users';

interface AddFavouriteDishRequest {
  readonly userId: string;
  readonly dishId: string;
}

@Injectable()
class AddFavouriteDishHandler implements Handler<AddFavouriteDishRequest, undefined | null> {
  constructor(private readonly usersFavFacade: UsersFavFacade, private readonly dishesFacade: DishesFacade) {}

  async exec(req: AddFavouriteDishRequest): Promise<undefined | null> {
    const dishExists = await this.dishesFacade.exists(req.dishId);
    if (!dishExists) return null;

    await this.usersFavFacade.add(req.userId, 'favouriteDishes', req.dishId);

    return undefined;
  }
}

export { AddFavouriteDishHandler };
