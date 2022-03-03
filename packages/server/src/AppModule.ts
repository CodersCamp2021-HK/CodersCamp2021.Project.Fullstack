import { Module } from '@nestjs/common';

import { AddressesModule } from './addresses';
import { ArticlesModule } from './articles';
import { AuthModule } from './auth';
import { AppConfigModule } from './config';
import { ImageModule } from './image';
import { RestaurantsModule } from './restaurants';
import { UsersModule } from './users';

const featureModules = [AddressesModule, ArticlesModule, AuthModule, RestaurantsModule, UsersModule, ImageModule];

@Module({
  imports: [AppConfigModule, ...featureModules],
})
export class AppModule {}
