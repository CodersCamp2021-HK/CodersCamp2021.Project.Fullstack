import { Get } from '@nestjs/common';

import { ApiAuthentication, ApiAuthorization, ApiController, PartnerId, Role } from '../../shared';

@ApiController({ path: 'restaurants', name: 'Restaurants', description: 'Operations about restaurants' })
class RestaurantsController {
  @Get('hello')
  @ApiAuthentication()
  hello() {
    return 'Hello restaurants';
  }

  @Get('protected/hello')
  @ApiAuthorization(Role.Partner)
  hello2(@PartnerId() id: string) {
    return `Hello partner ${id}`;
  }
}

export { RestaurantsController };
