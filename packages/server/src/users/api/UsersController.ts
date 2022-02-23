import { Get } from '@nestjs/common';

import { ApiAuthentication, ApiAuthorization, ApiController, Role, UserId } from '../../shared';

@ApiController({ path: 'users', name: 'Users', description: 'Operations about users' })
class UsersController {
  @Get('hello')
  @ApiAuthentication()
  hello() {
    return 'Hello users';
  }

  @Get('protected/hello')
  @ApiAuthorization(Role.User)
  hello2(@UserId() id: string) {
    return `Hello user ${id}`;
  }
}

export { UsersController };
