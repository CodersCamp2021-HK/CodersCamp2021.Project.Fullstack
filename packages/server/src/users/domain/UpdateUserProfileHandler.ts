import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Handler } from '../../shared';
import { Card, User, UserDocument } from '../database';

interface UpdateUserProfileRequest {
  readonly id: string;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly card: Card;
  readonly profileCompleted: boolean;
}

@Injectable()
class UpdateUserProfileHandler implements Handler<UpdateUserProfileRequest, null | undefined> {
  constructor(@InjectModel(User.name) private userModule: Model<UserDocument>) {}

  async exec(req: UpdateUserProfileRequest): Promise<null | undefined> {
    const result = await this.userModule.findOneAndUpdate(
      { _id: req.id },
      {
        name: req.name,
        surname: req.surname,
        email: req.email,
        phoneNumber: req.phoneNumber,
        card: req.card,
      },
    );

    //TODO update profileCompleted when all date are passed
    // if (
    //   req.name === undefined ||
    //   req.surname === undefined ||
    //   req.email === undefined ||
    //   req.phoneNumber === undefined ||
    //   req.card === undefined
    // ) {
    //   await this.userModule.findOneAndUpdate(
    //     { _id: req.id },
    //     {
    //       profileCompleted: false,
    //     },
    //   );
    // }

    if (result === null) return null;

    return undefined;
  }
}

export { UpdateUserProfileHandler };
