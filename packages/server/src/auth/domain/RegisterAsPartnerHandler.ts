import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { RestaurantsFacade } from '../../restaurants';
import { Handler, Role } from '../../shared';
import { Auth, AuthDocument } from '../database';
import { PasswordHasher } from './PasswordHasher';

type RegisterAsPartnerRequest = {
  readonly email: string;
  readonly password: string;
  readonly phoneNumber: string;
  readonly nip: string;
};

class RegisterAsPartnerHandler implements Handler<RegisterAsPartnerRequest, void> {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private readonly passwordHasher: PasswordHasher,
    private readonly restaurantsFacade: RestaurantsFacade,
  ) {}

  async exec(req: RegisterAsPartnerRequest): Promise<void> {
    const { email, password: passwordRaw } = req;
    const password = await this.passwordHasher.hash(passwordRaw);
    const authDoc = await this.authModel.create({ email, password, role: Role.Partner });
    const restaurantId = await this.restaurantsFacade.create();
    authDoc.entityId = new ObjectId(restaurantId);

    // TODO implement rest of register as partner flow
    authDoc.verified = true;

    await authDoc.save();
  }
}

export { RegisterAsPartnerHandler };
