import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler, Paginated, PaginationQuery } from '../../shared';
import { Address, AddressDocument } from '../database';

interface ListAddressesRequest extends PaginationQuery {
  readonly ownerId: string;
}

class ListAddressesHandler implements Handler<ListAddressesRequest, Paginated<Address>> {
  constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) {}

  async exec(req: ListAddressesRequest): Promise<Paginated<Address>> {
    const offset = (req.page - 1) * req.limit;
    const queryFilter = { owner: req.ownerId };
    const addressesDocsQuery = this.addressModel.find(queryFilter).skip(offset).limit(req.limit);
    const countQuery = this.addressModel.countDocuments();
    const [addressesDocs, count] = await Promise.all([addressesDocsQuery.exec(), countQuery.exec()]);
    return { data: plainToInstance(Address, addressesDocs), pages: Math.ceil(count / req.limit) };
  }
}

export { ListAddressesHandler };
