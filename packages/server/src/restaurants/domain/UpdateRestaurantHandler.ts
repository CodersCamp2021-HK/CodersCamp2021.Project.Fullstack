import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AddressDto } from '../../addresses/api/AddressDto';
import { Handler } from '../../shared';
import { CuisineTypes, Restaurant, RestaurantDocument, RestaurantTags } from '../database';

interface UpdateRestaurantRequest {
  readonly id: string;
  readonly tags: RestaurantTags[];
  readonly cuisineType: CuisineTypes[];
  readonly addressId: AddressDto[];
}

@Injectable()
class UpdateRestaurantHandler implements Handler<UpdateRestaurantRequest, null | undefined> {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

  async exec(req: UpdateRestaurantRequest): Promise<null | undefined> {
    const result = await this.restaurantModel.findOneAndUpdate(
      { _id: req.id },
      { tags: req.tags, cuisineType: req.cuisineType, addressId: req.addressId },
    );
    if (result === null) return null;
    return undefined;
  }
}

export { UpdateRestaurantHandler };
