import { Body, Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { ApiAuthorization, ApiController, ApiCreate, ApiGet, ApiObjectIdParam, Role, Url, UserId } from '../../shared';
import { CreateAddressHandler, GetAddressHandler } from '../domain';
import { AddressDto, CreateAddressDto } from './AddressDto';

@ApiController({ path: 'users/addresses', name: "User's addresses", description: "Operations on user's addresses" })
class UserAddressController {
  constructor(
    private readonly getAddressHandler: GetAddressHandler,
    private readonly createAddressHandler: CreateAddressHandler,
  ) {}

  @ApiObjectIdParam()
  @ApiGet({ name: 'address', response: AddressDto })
  @ApiAuthorization(Role.User)
  async findById(@UserId() owner, @Param('id') id: string) {
    const address = await this.getAddressHandler.exec({ id, owner });
    if (!address) return null;
    return plainToInstance(AddressDto, address);
  }

  @ApiCreate({ name: 'address', response: AddressDto })
  @ApiAuthorization(Role.User)
  async create(
    @UserId() owner,
    @Body() createAddressDto: CreateAddressDto,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
  ) {
    const address = await this.createAddressHandler.exec({ ...createAddressDto, role: Role.User, owner });
    res.setHeader('Location', `${url.href}/${address.id}`);
    return plainToInstance(AddressDto, address);
  }
}

export { UserAddressController };
