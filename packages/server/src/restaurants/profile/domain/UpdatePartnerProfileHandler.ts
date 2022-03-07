import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { Address, AddressDocument } from '../../../addresses/database';
import { Handler } from '../../../shared';
import { CuisineTypes, Restaurant, RestaurantDocument, RestaurantTags } from '../../database';

interface UpdatePartnerProfileRequest {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly tags: RestaurantTags[];
  readonly cuisineType: CuisineTypes[];
  readonly bankAccountNumber: string;
  readonly phoneNumber: string;
  readonly addressId: Address[];
}

@Injectable()
class UpdatePartnerProfileHandler implements Handler<UpdatePartnerProfileRequest, null | undefined> {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
  ) {}

  async exec(req: UpdatePartnerProfileRequest): Promise<null | undefined> {
    const created = await this.restaurantModel.create({ ...req, addressId: new ObjectId(req.addressId[0].id) });

    console.log(created);
    const result = await this.restaurantModel.findOneAndUpdate(
      { _id: req.id },
      {
        name: req.name,
        description: req.description,
        tags: req.tags,
        cuisineType: req.cuisineType,
        bankAccountNumber: req.bankAccountNumber,
        phoneNumber: req.phoneNumber,
        addressId: req.addressId[0].id,
      },
    );

    if (result === null) return null;
    return undefined;
  }
}

export { UpdatePartnerProfileHandler };
