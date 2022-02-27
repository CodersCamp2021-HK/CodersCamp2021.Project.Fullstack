import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { env } from '../config';
import { RestaurantsModule } from '../restaurants';
import { UsersModule } from '../users';
import { AuthController } from './api';
import { Auth, AuthSchema } from './database';
import { LoginHandler, PasswordHasher, RegisterAsPartnerHandler, RegisterAsUserHandler } from './domain';
import { JwtStrategy, Pbkdf2PasswordHasher } from './infra';

const PasswordHasherProvider: Provider = {
  provide: PasswordHasher,
  useValue: new Pbkdf2PasswordHasher({
    hashBytes: 64,
    saltBytes: 16,
    iterations: 10000,
  }),
};
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: {
        issuer: env.SERVER_URL,
        algorithm: 'HS512',
        expiresIn: env.ACCESS_TOKEN_EXPIRATION_TIME,
      },
    }),
    RestaurantsModule,
    UsersModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [PasswordHasherProvider, LoginHandler, RegisterAsPartnerHandler, RegisterAsUserHandler, JwtStrategy],
})
class AuthModule {}

export { AuthModule };
