import { Module } from '@nestjs/common';

import { AddressesModule } from './addresses';
import { AuthModule } from './auth';
import { AppConfigModule } from './config';
import { ImageModule } from './image';
import { OrderModule } from './orders';
import { RestaurantsModule } from './restaurants';
import { UsersModule } from './users';
import { MailModule } from './mail';
import { ConfigModule } from '@nestjs/config';

const featureModules = [AddressesModule, AuthModule, RestaurantsModule, UsersModule, OrderModule, ImageModule, MailModule];

@Module({
  imports: [AppConfigModule, ConfigModule.forRoot({
    isGlobal: true,
  }), ...featureModules],
})
export class AppModule {}
