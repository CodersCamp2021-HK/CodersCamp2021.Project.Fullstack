import { Body } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { ApiController, ApiGet, ApiObjectIdParam, ApiUpdate } from '../../shared';
import { ApiAuthorization, Role, UserId } from '../../shared/auth';
import { UpdateUserDto, UserDto } from './UserDto';

@ApiController({ path: 'users', name: 'Users', description: 'Operations about users' })
class UsersController {
  @ApiObjectIdParam()
  @ApiGet({ name: 'user', response: UserDto })
  async findById() {
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
    };
    if (!user) return null;
    return plainToInstance(UserDto, user);
  }
  @ApiObjectIdParam()
  @ApiUpdate({ name: 'user' })
  @ApiAuthorization(Role.User)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(@UserId() partnerId: string, @Body() updateUserDto: UpdateUserDto) {
    return null;
  }
}

export { UsersController };
