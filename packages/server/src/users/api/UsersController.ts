import { Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ApiController, ApiGet, ApiUpdate } from '../../shared';
import { ApiAuthorization, Role, UserId } from '../../shared/auth';
import { UpdateUserDto, UserDto } from './UserDto';

@ApiController({ path: 'users/profile', name: "Users's profile", description: "Operations on user's profile" })
class UsersController {
  @ApiGet({ path: '', name: 'user', response: UserDto })
  @ApiAuthorization(Role.User)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findById(@UserId() userId: string) {
    const user = {
      id: '6200218668fc82e7bdf15088',
      name: 'string',
      surname: 'string',
      email: 'string',
      password: 'string',
      phoneNumber: 'string',
      addressId: ['string'],
      card: {},
      favouriteRestaurants: [
        {
          id: '6200218668fc82e7bdf15088',
          name: 'string',
        },
      ],
      favouriteDishes: [
        {
          id: '6200218668fc82e7bdf15088',
          name: 'string',
        },
      ],
      orders: ['string'],
      profileCompleted: false,
    }; // TODO: Hook up GetUserProfileHandler (issue #43), remove eslint-disable comment above
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
