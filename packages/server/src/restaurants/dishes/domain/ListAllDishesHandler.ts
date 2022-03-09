import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler, Paginated, PaginationQuery } from '../../../shared';
import { Dish, DishDocument } from '../database';

class ListAllDishesHandler implements Handler<PaginationQuery, Paginated<Dish>> {
  constructor(@InjectModel(Dish.name) private dishModel: Model<DishDocument>) {}

  async exec(req: PaginationQuery): Promise<Paginated<Dish>> {
    const offset = (req.page - 1) * req.limit;
    const dishDocsQuery = this.dishModel.find().skip(offset).limit(req.limit);
    const countQuery = this.dishModel.countDocuments();
    const [dishDocs, count] = await Promise.all([dishDocsQuery.exec(), countQuery.exec()]);
    return { data: plainToInstance(Dish, dishDocs), pages: Math.ceil(count / req.limit) };
  }
}

export { ListAllDishesHandler };
