import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Dish, DishDocument } from '../dishes/database';

class DishesFacade {
  constructor(@InjectModel(Dish.name) private readonly dishModel: Model<DishDocument>) {}

  async findById(id: string) {
    return this.dishModel.findById(id);
  }
}

export { DishesFacade };
