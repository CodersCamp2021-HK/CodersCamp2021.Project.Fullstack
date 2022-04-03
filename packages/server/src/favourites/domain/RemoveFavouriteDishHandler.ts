import { Injectable } from '@nestjs/common';

import { Handler } from '../../shared';
import { UsersFavFacade } from '../../users';

interface RemoveFavouriteDishRequest {
  readonly userId: string;
  readonly dishId: string;
}

@Injectable()
class RemoveFavouriteDishHandler implements Handler<RemoveFavouriteDishRequest, null | undefined> {
  constructor(private readonly usersFavFacade: UsersFavFacade) {}

  async exec(req: RemoveFavouriteDishRequest): Promise<null | undefined> {
    const success = await this.usersFavFacade.remove(req.userId, 'favouriteDishes', req.dishId);
    return success ? undefined : null;
  }
}

export { RemoveFavouriteDishHandler };
