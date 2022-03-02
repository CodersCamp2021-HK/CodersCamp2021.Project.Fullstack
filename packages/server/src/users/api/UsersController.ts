import { Param } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ApiController, ApiGet, ApiObjectIdParam } from '../../shared';
import { UserDto } from './UserDto';

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
}

export { UsersController };
