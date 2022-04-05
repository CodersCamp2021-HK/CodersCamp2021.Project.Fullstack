import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { Dish, DishDocument } from '../dishes/database';

class DishesFacade {
  constructor(@InjectModel(Dish.name) private readonly dishModel: Model<DishDocument>) {}

  async exists(id: string) {
    const dish = await this.dishModel.findById(id);
    return dish !== null;
  }

  async areOrderable(dishIds: string[]) {
    const validCount = await this.dishModel.countDocuments({
      _id: { $in: dishIds.map((id) => new ObjectId(id)) },
      updated: false,
    });

    return validCount === dishIds.length;
  }
}

export { DishesFacade };
