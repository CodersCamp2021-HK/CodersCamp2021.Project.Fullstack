import { Module } from '@nestjs/common';

import { AddressesModule } from './addresses';
import { AuthModule } from './auth';
import { AppConfigModule } from './config';
import { FavouritesModule } from './favourites';
import { ImageModule } from './image';
import { MailModule } from './mail';
import { OrderModule } from './orders';
import { RestaurantsModule } from './restaurants';
import { UsersModule } from './users';

const featureModules = [
  AddressesModule,
  AuthModule,
  RestaurantsModule,
  UsersModule,
  FavouritesModule,
  OrderModule,
  ImageModule,
  MailModule,
];

@Module({
  imports: [AppConfigModule, ...featureModules],
})
export class AppModule {}
