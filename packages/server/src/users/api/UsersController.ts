import { Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ApiController, ApiGet, ApiUpdate } from '../../shared';
import { ApiAuthorization, Role, UserId } from '../../shared/auth';
import { GetUserHandler } from '../domain';
import { UpdateUserDto, UserDto } from './UserDto';

@ApiController({ path: 'users/profile', name: "Users's profile", description: "Operations on user's profile" })
class UsersController {
  constructor(private readonly getUserHandler: GetUserHandler) {}
  @ApiGet({ path: '', name: 'user', response: UserDto })
  @ApiAuthorization(Role.User)
  async findById(@UserId() userId: string) {
    const user = await this.getUserHandler.exec({ userId });
    if (!user) return null;
    return plainToInstance(UserDto, user);
  }

  @ApiUpdate({ path: '', name: 'user' })
  @ApiAuthorization(Role.User)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(@UserId() userId: string, @Body() updateUserDto: UpdateUserDto) {
    return null; // TODO: Hook up UpdateUserProfileHandler (issue #44), remove eslint-disable comment above
  }
}

export { UsersController };
