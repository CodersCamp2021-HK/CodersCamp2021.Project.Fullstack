import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { User, UserDocument } from '../database';

interface UpdateUserProfileRequest {
  readonly name: string;
  readonly surname: string;
  readonly phoneNumber: string;
}

@Injectable()
class UpdateUserProfileHandler implements Handler<UpdateUserProfileRequest, null | undefined> {
  constructor(@InjectModel(User.name) private userModule: Model<UserDocument>) {}

  async exec(req: UpdateUserProfileRequest): Promise<null | undefined> {
    const result = await this.userModule.findOneAndUpdate({ name: req.name, surname: req.surname });
    if (result === null) return null;
    return undefined;
  }
}

export { UpdateUserProfileHandler };
