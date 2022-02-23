import { Module } from '@nestjs/common';

import { ArticlesModule } from './articles';
import { AppConfigModule } from './config';

const featureModules = [ArticlesModule];

@Module({
  imports: [AppConfigModule, ...featureModules],
})
export class AppModule {}
