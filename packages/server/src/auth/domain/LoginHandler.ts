import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Handler, Role } from '../../shared';
import { Auth, AuthDocument } from '../database';
import { PasswordHasher } from './PasswordHasher';

interface LoginRequest {
  readonly email: string;
  readonly password: string;
  readonly role: Role;
}

interface LoginResponse {
  readonly accessToken: string;
}

class LoginHandler implements Handler<LoginRequest, LoginResponse> {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JwtService,
  ) {}

  async exec(req: LoginRequest): Promise<LoginResponse> {
    const { email, role, password } = req;
    const filter = { email, role };
    const authUser = (await this.authModel.findOne(filter))?.toObject();
    if (!authUser) {
      throw new UnauthorizedException();
    }

    if (!(await this.passwordHasher.match(password, authUser.password))) {
      throw new UnauthorizedException();
    }

    const jwt = await this.jwtService.signAsync({ sub: authUser.entityId, role });
    return { accessToken: jwt };
  }
}

export { LoginHandler };
