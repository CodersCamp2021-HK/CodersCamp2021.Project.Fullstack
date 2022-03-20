import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler, Paginated, PaginationQuery } from '../../shared';
import { Restaurant, RestaurantDocument } from '../database';

class ListRestaurantsHandler implements Handler<PaginationQuery, Paginated<Restaurant>> {
  constructor(@InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}

  async exec(req: PaginationQuery): Promise<Paginated<Restaurant>> {
    const offset = (req.page - 1) * req.limit;
    const queryFilter = { isCompleted: true };

    const restaurantDocsQuery = this.restaurantModel.find(queryFilter).skip(offset).limit(req.limit);
    const countQuery = this.restaurantModel.countDocuments(queryFilter);
    const [restaurantDocs, count] = await Promise.all([restaurantDocsQuery.exec(), countQuery.exec()]);
    return { data: plainToInstance(Restaurant, restaurantDocs), pages: Math.ceil(count / req.limit) };
  }
}

export { ListRestaurantsHandler };
