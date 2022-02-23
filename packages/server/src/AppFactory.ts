import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import _ from 'lodash';

import { AppModule } from './AppModule';
import { env, setupSecurity, setupSwagger } from './config';

async function appFactory(options: NestApplicationOptions = {}) {
  const app = await NestFactory.create(AppModule, {
    logger: env.NODE_ENV !== 'production' ? ['verbose', 'debug', 'log', 'warn', 'error'] : ['log', 'warn', 'error'],
    ...options,
  });
  app.setGlobalPrefix('api');
  const setup = _.flow(setupSecurity, setupSwagger);
  return setup(app);
}

export { appFactory };
