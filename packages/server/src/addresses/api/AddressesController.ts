import { Body, Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { ApiController, ApiCreate, ApiDelete, ApiGet, ApiObjectIdParam, ApiUpdate, Url } from '../../shared';
import { CreateAddressHandler, DeleteAddressHandler, GetAddressHandler, UpdateAddressHandler } from '../domain';
import { AddressDto, CreateAddressDto, UpdateAddressDto } from './AddressDto';

@ApiController({ path: 'addresses', name: 'Addresses', description: 'Operations about addresses' })
class AddressesController {
  constructor(
    private readonly getAddressHandler: GetAddressHandler,
    private readonly createAddressHandler: CreateAddressHandler,
    private readonly updateAddressHandler: UpdateAddressHandler,
    private readonly deleteAddressHandler: DeleteAddressHandler,
  ) {}

  @ApiObjectIdParam()
  @ApiGet({ name: 'address', response: AddressDto })
  async findById(@Param('id') id: string) {
    const address = await this.getAddressHandler.exec({ id });
    if (!address) return null;
    return plainToInstance(AddressDto, address);
  }

  @ApiCreate({ name: 'address', response: AddressDto })
  async create(@Body() createAddressDto: CreateAddressDto, @Res({ passthrough: true }) res: Response, @Url() url: URL) {
    const address = await this.createAddressHandler.exec(createAddressDto);
    res.setHeader('Location', `${url.href}/${address.id}`);
    return plainToInstance(AddressDto, address);
  }

  @ApiObjectIdParam()
  @ApiUpdate({ name: 'address' })
  async update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.updateAddressHandler.exec({ id, ...updateAddressDto });
  }

  @ApiObjectIdParam()
  @ApiDelete({ name: 'address' })
  async delete(@Param('id') id: string) {
    return this.deleteAddressHandler.exec({ id });
  }
}

export { AddressesController };
