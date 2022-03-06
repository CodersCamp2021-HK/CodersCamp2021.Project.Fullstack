import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler, Paginated, PaginationQuery } from '../../../shared';
import { Dish, DishDocument } from '../database';

interface ListDishesRequest extends PaginationQuery {
  readonly partnerId: string;
}
class ListDishesHandler implements Handler<ListDishesRequest, Paginated<Dish> | Dish | null> {
  constructor(@InjectModel(Dish.name) private dishModel: Model<DishDocument>) {}

  async exec(req: ListDishesRequest) {
    const offset = (req.page - 1) * req.limit;
    const queryFilter = { restaurant: req.partnerId };
    const dishDocsQuery = this.dishModel.find(queryFilter).skip(offset).limit(req.limit);
    const countQuery = this.dishModel.countDocuments();
    const [dishDocs, count] = await Promise.all([dishDocsQuery.exec(), countQuery.exec()]);
    return { data: plainToInstance(Dish, dishDocs), pages: Math.ceil(count / req.limit) };
  }
}

export { ListDishesHandler };
