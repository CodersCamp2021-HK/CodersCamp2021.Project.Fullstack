import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';
import { Model } from 'mongoose';

import { Address } from '../../../addresses/database';
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
  // readonly logo: string;
  // readonly addressId: Address[];
}

@Injectable()
class UpdatePartnerProfileHandler implements Handler<UpdatePartnerProfileRequest, null | undefined> {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

  async exec(req: UpdatePartnerProfileRequest): Promise<null | undefined> {
    const filter = { _id: req.id };
    const update = {
      name: req.name || null,
      description: req.description || null,
      cuisineType: req.cuisineType || null,
      tags: req.tags || null,
      bankAccountNumber: req.bankAccountNumber || null,
      phoneNumber: req.phoneNumber || null,
      // logo: req.logo || null,
      // addressId: req.address || null,
    };
    // ma być dodany jakiś adressId oraz logo

    const partnerDoc = await this.restaurantModel.findOne(filter);
    const result = _.merge(partnerDoc, update);

    result.save();
    if (result === null) return null;

    // if (!_.values(result?.toObject()).some(_.isNull)) {
    //   result.profileCompleted = true;
    //   result.save();
    // }

    return undefined;
  }
}

export { UpdatePartnerProfileHandler };
