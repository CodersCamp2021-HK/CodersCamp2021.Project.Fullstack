import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Auth, AuthDocument } from '../database';

class AuthFacade {
  constructor(@InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>) {}

  async getEmailByUserId(id: string) {
    const userDoc = await this.authModel.findOne({ entityId: id });
    return userDoc?.email;
  }
}

export { AuthFacade };
