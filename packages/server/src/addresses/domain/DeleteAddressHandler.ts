import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Address, AddressDocument } from '../database';

interface DeleteAddressRequest {
  readonly id: string;
}

@Injectable()
class DeleteAddressHandler implements Handler<DeleteAddressRequest, null | undefined> {
  constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) {}

  async exec(req: DeleteAddressRequest): Promise<null | undefined> {
    const result = await this.addressModel.deleteOne({ _id: req.id });
    if (result.deletedCount !== 1) return null;
    return undefined;
  }
}

export { DeleteAddressHandler };
