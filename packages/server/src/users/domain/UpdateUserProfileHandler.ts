import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Card, User, UserDocument } from '../database';

interface UpdateUserProfileRequest {
  readonly id: string;
  readonly name: string;
  readonly surname: string;
  readonly phoneNumber: string;
  readonly card: Card;
  readonly profileCompleted: boolean;
}

@Injectable()
class UpdateUserProfileHandler implements Handler<UpdateUserProfileRequest, null | undefined> {
  constructor(@InjectModel(User.name) private userModule: Model<UserDocument>) {}

  async exec(req: UpdateUserProfileRequest): Promise<null | undefined> {
    const result = await this.userModule.findByIdAndUpdate(
      req.id,
      {
        name: req.name,
        surname: req.surname,
        phoneNumber: req.phoneNumber,
        card: req.card,
      },
      { returnDocument: 'after' },
    );

    if (
      result?.name !== undefined &&
      result?.surname !== undefined &&
      result?.phoneNumber !== undefined &&
      result?.card !== undefined
    ) {
      await this.userModule.findOneAndUpdate(
        { _id: req.id },
        {
          profileCompleted: true,
        },
      );
    }

    if (result === null) return null;

    return undefined;
  }
}

export { UpdateUserProfileHandler };
