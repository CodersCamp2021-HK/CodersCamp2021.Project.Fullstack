import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { Handler, Paginated, PaginationQuery } from '../../../shared';
import { CuisineTypes } from '../../database';
import { Dish, DishDocument, DishTags, MealType } from '../database';

export interface DishFilters {
  readonly city?: string;
  readonly cuisineType?: CuisineTypes[];
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

    const pipeline = this.getDishesFilterPipeline(req);

    const dishDocsQuery = this.dishModel
      .aggregate(pipeline)
      .skip(offset)
      .limit(req.limit)
      .then((results) => results.map((dish) => this.dishModel.hydrate(dish)));

    const countQuery = this.dishModel
      .aggregate(pipeline)
      .count('count')
      .then((results) => results[0]?.count ?? 0);

    const [dishDocs, count] = await Promise.all([dishDocsQuery, countQuery]);
    return { data: plainToInstance(Dish, dishDocs), pages: Math.ceil(count / req.limit) };
  }

  private getDishesFilterPipeline(filters: DishFilters & { restaurantId?: string }) {
    return [
      {
        // https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
        $lookup: {
          from: 'restaurants',
          localField: 'restaurant', // Location of restaurant id in dish
          foreignField: '_id', // Name of ObjectId property in restaurant
          as: 'restaurant', // New name for the looked up object (replace original one in this case)
        },
      },
      {
        // https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/
        $unwind: {
          path: '$restaurant', // Turn restaurant array into an object
        },
      },
      {
        // https://docs.mongodb.com/manual/reference/operator/aggregation/match/
        $match: _.omitBy(
          {
            'restaurant._id': filters.restaurantId ? new ObjectId(filters.restaurantId) : null,
            'restaurant.operationalCities': filters.city,
            'restaurant.cuisineType': filters.cuisineType ? { $in: filters.cuisineType } : null,
            mealType: filters.mealType ? { $in: filters.mealType } : null,
            tags: filters.tags ? { $all: filters.tags } : null,
            updated: false,
          },
          _.isNil,
        ),
      },
      {
        // https://docs.mongodb.com/manual/reference/operator/aggregation/set/
        $set: { restaurant: '$restaurant._id' }, // Set the restaurant object back to id for hydration
      },
    ];
  }
}

export { ListDishesHandler };
