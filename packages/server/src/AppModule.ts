import { Module } from '@nestjs/common';

import { AddressesModule } from './addresses';
import { ArticlesModule } from './articles';
import { AppConfigModule } from './config';
import { UsersModule } from './users';

const featureModules = [ArticlesModule, UsersModule, AddressesModule];

@Module({
  imports: [AppConfigModule, ...featureModules],
})
export class AppModule {}
