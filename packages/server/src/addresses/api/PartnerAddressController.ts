import { Body, Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import {
  ApiAuthorization,
  ApiController,
  ApiCreate,
  ApiGet,
  ApiObjectIdParam,
  PartnerId,
  Role,
  Url,
} from '../../shared';
import { CreateAddressHandler, GetAddressHandler } from '../domain';
import { AddressDto, CreateAddressDto } from './AddressDto';

@ApiController({
  path: 'partner/addresses',
  name: "Partner's addresses",
  description: "Operations on partner's addresses",
})
class PartnerAddressController {
  constructor(
    private readonly getAddressHandler: GetAddressHandler,
    private readonly createAddressHandler: CreateAddressHandler,
  ) {}

  @ApiObjectIdParam()
  @ApiGet({ name: 'address', response: AddressDto })
  @ApiAuthorization(Role.Partner)
  async findById(@PartnerId() owner, @Param('id') id: string) {
    const address = await this.getAddressHandler.exec({ id, owner });
    if (!address) return null;
    return plainToInstance(AddressDto, address);
  }

  @ApiCreate({ name: 'address', response: AddressDto })
  @ApiAuthorization(Role.Partner)
  async create(
    @PartnerId() owner,
    @Body() createAddressDto: CreateAddressDto,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
  ) {
    const address = await this.createAddressHandler.exec({ ...createAddressDto, owner });
    res.setHeader('Location', `${url.href}/${address.id}`);
    return plainToInstance(AddressDto, address);
  }
}

export { PartnerAddressController };
