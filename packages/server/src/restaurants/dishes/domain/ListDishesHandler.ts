import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import _ from 'lodash';
import { Model } from 'mongoose';

import { Handler, Paginated, PaginationQuery } from '../../../shared';
import { Dish, DishDocument, DishTags, MealType } from '../database';

export interface DishFilters {
  readonly city?: string;
  readonly mealType?: MealType[];
  readonly tags?: DishTags[];
}

type ListDishesRequest = PaginationQuery &
  DishFilters & {
    readonly restaurantId?: string;
  };

class ListDishesHandler implements Handler<ListDishesRequest, Paginated<Dish> | Dish | null> {
  constructor(@InjectModel(Dish.name) private dishModel: Model<DishDocument>) {}

  async exec(req: ListDishesRequest) {
    const offset = (req.page - 1) * req.limit;
    const queryFilter = _.omitBy(
      {
        restaurant: req.restaurantId,
        mealType: req.mealType ? { $all: req.mealType } : null,
        tags: req.tags ? { $all: req.tags } : null,
      },
      _.isNil,
    );
    const dishDocsQuery = this.dishModel.find(queryFilter).skip(offset).limit(req.limit);
    const countQuery = this.dishModel.countDocuments();
    const [dishDocs, count] = await Promise.all([dishDocsQuery.exec(), countQuery.exec()]);
    return { data: plainToInstance(Dish, dishDocs), pages: Math.ceil(count / req.limit) };
  }
}

export { ListDishesHandler };
