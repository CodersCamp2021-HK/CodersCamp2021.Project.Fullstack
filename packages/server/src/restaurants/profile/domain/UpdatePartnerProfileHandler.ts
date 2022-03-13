import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';
import { Model } from 'mongoose';

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
}

@Injectable()
class UpdatePartnerProfileHandler implements Handler<UpdatePartnerProfileRequest, null | undefined> {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

  async exec(req: UpdatePartnerProfileRequest): Promise<null | undefined> {
    const filter = { _id: req.id };
    const update = {
      name: req.name ? req.name : null,
      description: req.description ? req.description : null,
      cuisineType: req.cuisineType ? req.cuisineType : null,
      tags: req.tags ? req.tags : null,
      bankAccountNumber: req.bankAccountNumber ? req.bankAccountNumber : null,
      phoneNumber: req.phoneNumber ? req.phoneNumber : null,
    };

    const result = await this.restaurantModel.findOneAndUpdate(filter, update, { new: true });

    if (result === null) return null;

    const isNotNull = (val) => val != null;

    if (_.values(result?.toObject()).every(isNotNull)) {
      result.profileCompleted = true;
      result.save();
    }

    return undefined;
  }
}

export { UpdatePartnerProfileHandler };
