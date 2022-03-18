import { Body, Param, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import {
  ApiAuthorization,
  ApiController,
  ApiCreate,
  ApiGet,
  ApiList,
  ApiObjectIdParam,
  ApiUpdate,
  createPaginationLink,
  Pagination,
  PaginationQuery,
  PartnerId,
  Role,
  Url,
} from '../../shared';
import { CreateAddressHandler, GetAddressHandler, ListAddressesHandler, RemoveAddressFromProfile } from '../domain';
import { AddressDto, CreateAddressDto } from './AddressDto';
import { AddressListDto } from './AddressListDto';

@ApiController({
  path: 'partner/addresses',
  name: "Partner's addresses",
  description: "Operations on partner's addresses",
})
class PartnerAddressController {
  constructor(
    private readonly getAddressHandler: GetAddressHandler,
    private readonly createAddressHandler: CreateAddressHandler,
    private readonly listAddressesHandler: ListAddressesHandler,
    private readonly removeAddressFromProfile: RemoveAddressFromProfile,
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
    const address = await this.createAddressHandler.exec({ ...createAddressDto, role: Role.Partner, owner });
    res.setHeader('Location', `${url.href}/${address.id}`);
    return plainToInstance(AddressDto, address);
  }

  @ApiList({ name: 'addresses', response: AddressListDto, link: true })
  @ApiAuthorization(Role.Partner)
  async list(
    @PartnerId() ownerId: string,
    @Pagination() { page, limit }: PaginationQuery,
    @Res({ passthrough: true }) resp: Response,
    @Url() url: URL,
  ) {
    const paginatedAddresses = await this.listAddressesHandler.exec({ page, limit, ownerId });
    resp.setHeader('Link', createPaginationLink(url, paginatedAddresses.pages));
    return plainToInstance(AddressListDto, paginatedAddresses);
  }

  @ApiUpdate({ name: 'address' })
  @ApiAuthorization(Role.Partner)
  async removeAddress(@PartnerId() owner: string, @Param('id') id: string) {
    return this.removeAddressFromProfile.exec({ id, owner, role: Role.Partner });
  }
}

export { PartnerAddressController };
