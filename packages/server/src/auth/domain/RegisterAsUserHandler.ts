import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { Handler, Role } from '../../shared';
import { UsersFacade } from '../../users';
import { Auth, AuthDocument } from '../database';
import { PasswordHasher } from './PasswordHasher';
import { MailService } from '../../mail';

type RegisterAsUserRequest = {
  readonly email: string;
  readonly password: string;
};

class RegisterAsUserHandler implements Handler<RegisterAsUserRequest, void> {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private readonly passwordHasher: PasswordHasher,
    private readonly usersFacade: UsersFacade,
    private readonly MailService: MailService,
  ) {}

  async exec(req: RegisterAsUserRequest): Promise<void> {
    const { email, password: passwordRaw } = req;
    const password = await this.passwordHasher.hash(passwordRaw);
    const authDoc = await this.authModel.create({ email, password, role: Role.User });
    const userId = await this.usersFacade.create();
    authDoc.entityId = new ObjectId(userId);

    // TODO implement rest of register as user flow
    authDoc.verified = true;

    await this.MailService.sendUserConfirmation(authDoc, 'test');


    await authDoc.save();
  }
}

export { RegisterAsUserHandler };
