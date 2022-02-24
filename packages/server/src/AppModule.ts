import { Module } from '@nestjs/common';

import { ArticlesModule } from './articles';
import { AppConfigModule } from './config';
import { UsersModule } from './users';

const featureModules = [ArticlesModule, UsersModule];

@Module({
  imports: [AppConfigModule, ...featureModules],
})
export class AppModule {}
