import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { User, UserDocument } from '../database';

class UsersFacade {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create() {
    const userDoc = await this.userModel.create({});
    const user = plainToInstance(User, userDoc);
    return user.id;
  }
}

export { UsersFacade };
