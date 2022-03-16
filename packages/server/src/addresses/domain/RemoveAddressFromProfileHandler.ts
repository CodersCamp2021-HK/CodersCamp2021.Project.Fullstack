import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Restaurant, RestaurantDocument } from '../../restaurants/database';
import { Handler, Role } from '../../shared';
import { User, UserDocument } from '../../users/database';
import { Address, AddressDocument } from '../database';

interface RemoveAddressRequest {
  readonly id: string;
  readonly owner: string;
  readonly role: Role;
}

@Injectable()
class RemoveAddressFromProfile implements Handler<RemoveAddressRequest, void> {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async exec({ id, owner, role }: RemoveAddressRequest): Promise<void> {
    await this.addressModel.findOneAndUpdate({ _id: id, owner }, { owner: null });
    if (role === Role.User) await this.userModel.updateOne({ _id: owner }, { $pull: { addressId: id } });
    if (role === Role.Partner) await this.restaurantModel.updateOne({ _id: owner }, { $pull: { addressId: id } });
  }
}

export { RemoveAddressFromProfile };
