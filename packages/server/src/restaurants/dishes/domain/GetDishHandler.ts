import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../../shared';
import { Dish, DishDocument } from '../database';

interface GetDishRequest {
  readonly dishId: string;
}

class GetDishHandler implements Handler<GetDishRequest, Dish | null> {
  constructor(@InjectModel(Dish.name) private dishModel: Model<DishDocument>) {}

  async exec(req: GetDishRequest): Promise<Dish | null> {
    const dish = await this.dishModel.findById(req.dishId);
    if (!dish) return null;
    return plainToInstance(Dish, dish);
  }
}

export { GetDishHandler };
