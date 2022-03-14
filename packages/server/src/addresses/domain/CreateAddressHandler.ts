import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Restaurant, RestaurantDocument } from '../../restaurants/database';
import { Handler, Role } from '../../shared';
import { User, UserDocument } from '../../users/database';
import { Address, AddressDocument } from '../database';

interface CreateAddressRequest {
  readonly street: string;
  readonly streetNumber: string;
  readonly apartmentNumber: string;
  readonly floor: string;
  readonly city: string;
  readonly postcode: string;
  readonly owner: string;
  readonly role: Role;
}

@Injectable()
class CreateAddressHandler implements Handler<CreateAddressRequest, Address> {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  private updateOwnerModel(role: Role, owner: string, created: Address) {
    switch (role) {
      case Role.Partner:
        return this.restaurantModel.findByIdAndUpdate(owner, { $push: { addressId: created } });
      case Role.User:
        return this.userModel.findByIdAndUpdate(owner, { $push: { addressId: created } });
    }
  }

  async exec(req: CreateAddressRequest): Promise<Address> {
    const created = await this.addressModel.create(req);
    await this.updateOwnerModel(req.role, req.owner, created);

    return plainToInstance(Address, created);
  }
}

export { CreateAddressHandler };
