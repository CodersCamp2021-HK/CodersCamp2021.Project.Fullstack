import { Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ApiController, ApiGet, ApiUpdate } from '../../shared';
import { ApiAuthorization, Role, UserId } from '../../shared/auth';
import { GetUserHandler } from '../domain';
import { UpdateUserProfileHandler } from '../domain/UpdateUserProfileHandler';
import { UpdateUserDto, UserDto } from './UserDto';
@ApiController({ path: 'users/profile', name: "Users's profile", description: "Operations on user's profile" })
class UsersController {
  constructor(
    private readonly getUserHandler: GetUserHandler,
    private readonly updateUserProfileHandler: UpdateUserProfileHandler,
  ) {}

  @ApiGet({ path: '', name: 'user', response: UserDto })
  @ApiAuthorization(Role.User)
  async findById(@UserId() userId: string) {
    const user = await this.getUserHandler.exec({ id: userId });
    if (!user) return null;
    return plainToInstance(UserDto, user);
  }

  @ApiUpdate({ path: '', name: 'user' })
  @ApiAuthorization(Role.User)
  async update(@UserId() userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserProfileHandler.exec({ id: userId, ...updateUserDto });
  }
}

export { UsersController };
