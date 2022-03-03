import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { User, UserDocument } from '../database';

interface GetUserRequest {
  readonly userId: string;
}

class GetUserHandler implements Handler<GetUserRequest, User | null> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async exec(req: GetUserRequest): Promise<User | null> {
    const user = await this.userModel.findById(req.userId);
    console.log(req);
    if (!user) return null;
    return plainToInstance(User, user);
  }
}

export { GetUserHandler };
