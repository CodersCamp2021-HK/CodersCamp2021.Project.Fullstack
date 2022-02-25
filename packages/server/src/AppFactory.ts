import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import _ from 'lodash';

import { AppModule } from './AppModule';
import { createSwaggerDocument, env, setupOpenApiValidator, setupSecurity, setupSwagger } from './config';

async function appFactory(options: NestApplicationOptions = {}) {
  const app = await NestFactory.create(AppModule, {
    logger: env.NODE_ENV !== 'production' ? ['verbose', 'debug', 'log', 'warn', 'error'] : ['log', 'warn', 'error'],
    ...options,
  });
  app.setGlobalPrefix('api');
  const apiSpec = createSwaggerDocument(app);
  const setup = _.flow(
    setupSecurity,
    _.curryRight(setupSwagger)(apiSpec),
    _.curryRight(setupOpenApiValidator)(apiSpec),
  );
  return setup(app);
}

export { appFactory };
