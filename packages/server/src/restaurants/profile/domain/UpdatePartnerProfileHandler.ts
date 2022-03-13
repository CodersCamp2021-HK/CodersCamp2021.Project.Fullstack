import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    const result = await this.restaurantModel.findOneAndUpdate(
      { _id: req.id },
      {
        name: req.name,
        description: req.description,
        cuisineType: req.cuisineType,
        tags: req.tags,
        bankAccountNumber: req.bankAccountNumber,
        phoneNumber: req.phoneNumber,
      },
    );

    if (result === null) return null;
    return undefined;
  }
}

export { UpdatePartnerProfileHandler };
