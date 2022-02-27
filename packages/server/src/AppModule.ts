import { Module } from '@nestjs/common';

import { ArticlesModule } from './articles';
import { AuthModule } from './auth';
import { AppConfigModule } from './config';
import { RestaurantsModule } from './restaurants';
import { UsersModule } from './users';

const featureModules = [ArticlesModule, AuthModule, RestaurantsModule, UsersModule];

@Module({
  imports: [AppConfigModule, ...featureModules],
})
export class AppModule {}
