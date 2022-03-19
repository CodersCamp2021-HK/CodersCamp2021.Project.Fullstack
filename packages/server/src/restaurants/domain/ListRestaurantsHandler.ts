import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import _ from 'lodash';
import { Model } from 'mongoose';

import { Handler, Paginated, PaginationQuery } from '../../shared';
import { CuisineTypes, Restaurant, RestaurantDocument, RestaurantTags } from '../database';

export interface RestaurantFilters {
  city: string;
  cuisineType: CuisineTypes[];
  tags: RestaurantTags[];
}

type ListRestaurantsRequest = PaginationQuery & RestaurantFilters;

class ListRestaurantsHandler implements Handler<ListRestaurantsRequest, Paginated<Restaurant>> {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

  async exec(req: ListRestaurantsRequest): Promise<Paginated<Restaurant>> {
    const offset = (req.page - 1) * req.limit;
    const queryFilter = _.omitBy(
      {
        profileCompleted: true,
        cuisineType: req.cuisineType ? { $all: req.cuisineType } : null,
        tags: req.tags ? { $all: req.tags } : null,
      },
      _.isNil,
    );
    const restaurantDocsQuery = this.restaurantModel
      .find(queryFilter)
      .populate('addressId')
      .skip(offset)
      .limit(req.limit);
    const countQuery = this.restaurantModel.countDocuments(queryFilter);
    const [restaurantDocs, count] = await Promise.all([restaurantDocsQuery.exec(), countQuery.exec()]);
    return { data: plainToInstance(Restaurant, restaurantDocs), pages: Math.ceil(count / req.limit) };
  }
}

export { ListRestaurantsHandler };
