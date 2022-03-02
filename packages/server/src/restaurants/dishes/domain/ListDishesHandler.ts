import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler, Paginated, PaginationQuery } from '../../../shared';
import { Dish, DishDocument } from '../database';

class ListDishesHandler implements Handler<PaginationQuery, Paginated<Dish>> {
  constructor(@InjectModel(Dish.name) private dishModel: Model<DishDocument>) {}

  async exec(req: PaginationQuery): Promise<Paginated<Dish>> {
    const offset = (req.page - 1) * req.limit;
    const dishesDocsQuery = this.dishModel.find().skip(offset).limit(req.limit);
    const countQuery = this.dishModel.countDocuments();
    const [dishesDocs, count] = await Promise.all([dishesDocsQuery.exec(), countQuery.exec()]);
    return { data: plainToInstance(Dish, dishesDocs), pages: Math.ceil(count / req.limit) };
  }
}

export { ListDishesHandler };
