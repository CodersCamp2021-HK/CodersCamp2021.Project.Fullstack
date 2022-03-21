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
    if (partnerDoc.verified && !partnerDoc.isCompleted) throw new UnprocessableEntityException('Profile not completed');
    partnerDoc.verified = partnerDoc.isCompleted;
    await partnerDoc.save();
    return undefined;
  }
}

export { UpdatePartnerProfileHandler };
