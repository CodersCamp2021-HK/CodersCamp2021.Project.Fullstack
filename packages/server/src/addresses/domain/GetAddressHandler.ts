import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Address, AddressDocument } from '../database';

interface GetAddressRequest {
  readonly id: string;
  readonly owner: string;
}

class GetAddressHandler implements Handler<GetAddressRequest, Address | null> {
  constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) {}

  async exec({ id, owner }: GetAddressRequest): Promise<Address | null> {
    const address = await this.addressModel.findOne({ _id: id, owner });
    if (!address) return null;
    return plainToInstance(Address, address);
  }
}

export { GetAddressHandler };
