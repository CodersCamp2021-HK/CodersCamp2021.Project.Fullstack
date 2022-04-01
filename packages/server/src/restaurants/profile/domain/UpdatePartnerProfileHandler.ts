import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
  readonly bankAccountNumber?: string;
  readonly phoneNumber?: string;
}

@Injectable()
class UpdatePartnerProfileHandler implements Handler<UpdatePartnerProfileRequest, null | undefined> {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

  async exec(req: UpdatePartnerProfileRequest): Promise<null | undefined> {
    const partnerDoc = await this.restaurantModel.findById(req.id);
    if (!partnerDoc) return null;
    _.assign(partnerDoc, _.omit(req, 'id'));
    const isValidUpdate = this.isValidUpdate(partnerDoc);
    if (partnerDoc.isCompleted && !isValidUpdate) {
      throw new UnprocessableEntityException('Update breaks completion requirements of partner profile');
    }
    if (!partnerDoc.isCompleted && isValidUpdate) {
      partnerDoc.isCompleted = true;
    }
    await partnerDoc.save();
    return undefined;
  }

  private isValidUpdate(partner: Restaurant) {
    const requirements = [
      partner.name,
      partner.bankAccountNumber,
      partner.phoneNumber,
      partner.addressId,
      partner.description,
      partner.cuisineType,
      partner.tags,
    ];

    return requirements.every(_.negate(_.isNil));
  }
}

export { UpdatePartnerProfileHandler };
