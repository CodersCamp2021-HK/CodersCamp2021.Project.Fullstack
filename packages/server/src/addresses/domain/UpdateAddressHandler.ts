import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Address, AddressDocument } from '../database';

interface UpdateAddressRequest {
  readonly id: string;
  readonly street: string;
  readonly streetNumber: string;
  readonly apartmentNumber: number;
  readonly floor: number;
  readonly city: string;
  readonly postcode: string;
  readonly longitude: number;
  readonly latitude: number;
}

@Injectable()
class UpdateAddressHandler implements Handler<UpdateAddressRequest, null | undefined> {
  constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) {}

  async exec(req: UpdateAddressRequest): Promise<null | undefined> {
    const result = await this.addressModel.findOneAndUpdate({ _id: req.id }, { ...req, id: undefined });
    if (result === null) return null;
    return undefined;
  }
}

export { UpdateAddressHandler };
