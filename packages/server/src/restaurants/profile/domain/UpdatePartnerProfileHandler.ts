import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Auth, AuthDocument } from '../../../auth/database';
import { PasswordHasher } from '../../../auth/domain/PasswordHasher';
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
  readonly password: string;
  // readonly addressId: Address[];
  // readonly logo: Buffer;
}

@Injectable()
class UpdatePartnerProfileHandler implements Handler<UpdatePartnerProfileRequest, null | undefined> {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    // private readonly passwordHasher: PasswordHasher,
  ) {}

  async exec(req: UpdatePartnerProfileRequest): Promise<null | undefined> {
    // TODO: add hashed password
    // const hashPassword = await this.passwordHasher.hash(req.id);

    const password = await this.authModel.findOneAndUpdate(
      { entityId: req.id },
      { password: req.password }
    );

    const result = await this.restaurantModel.findOneAndUpdate(
      { _id: req.id },
      {
        name: req.name,
        description: req.description,

        // TODO: add logo
        // logo: {},

        cuisineType: req.cuisineType,
        tags: req.tags,

        // TODO: add address (?)
        // addressId: req.addressId[0].id,

        bankAccountNumber: req.bankAccountNumber,
        phoneNumber: req.phoneNumber,
      },
    );

    if (result === null) return null;
    return undefined;
  }
}

export { UpdatePartnerProfileHandler };
