import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Dish, DishDocument } from '../dishes/database';

class DishesFacade {
  constructor(@InjectModel(Dish.name) private readonly dishModel: Model<DishDocument>) {}

  async exists(id: string) {
    const dish = await this.dishModel.findById(id);
    return dish !== null;
  }
}

export { DishesFacade };
