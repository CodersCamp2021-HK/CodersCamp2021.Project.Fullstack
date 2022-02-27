import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Address, AddressDocument } from '../database';

interface CreateAddressRequest {
  readonly street: string;
  readonly streetNumber: string;
  readonly apartmentNumber: number;
  readonly floor: number;
  readonly city: string;
  readonly postcode: string;
}

@Injectable()
class CreateAddressHandler implements Handler<CreateAddressRequest, Address> {
  constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) {}

  async exec(req: CreateAddressRequest): Promise<Address> {
    const created = await this.addressModel.create({ ...req });
    return plainToInstance(Address, created);
  }
}

export { CreateAddressHandler };
