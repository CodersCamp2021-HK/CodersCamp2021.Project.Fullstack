import { INestApplication } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import mongoose from 'mongoose';
import request from 'supertest';

import { AppModule } from '../src/AppModule';
import { createSwaggerDocument, setupOpenApiValidator } from '../src/config';
import { DatabaseProxy } from '../tools/database/DatabaseProxy';

type E2eFixtureOptions = Readonly<{
  debug?: boolean;
  override?: (builder: TestingModuleBuilder) => TestingModuleBuilder;
}>;

function initE2eFixture(options: E2eFixtureOptions = {}) {
  let app: INestApplication;
  const db = new DatabaseProxy();

  const debug = options.debug ?? false;
  const override = options.override ?? ((b) => b);

  beforeAll(async () => {
    mongoose.set('debug', debug);
    const moduleFixture: TestingModule = await override(
      Test.createTestingModule({
        imports: [AppModule],
      }),
    ).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    const apiSpec = createSwaggerDocument(app);
    app = setupOpenApiValidator(app, apiSpec);
    await app.init();
    await db.init();
    if (db.connection.db.databaseName !== 'test') {
      throw new Error('Connection allowed only to test db');
    }
  });

  afterAll(async () => {
    await app.close();
    await db.connection.db.dropDatabase();
    await db.close();
  });

  return {
    get app(): Omit<INestApplication, 'init' | 'close'> {
      return app;
    },
    get db(): Omit<DatabaseProxy, 'init' | 'close'> {
      return db;
    },
    get req() {
      return request(app.getHttpServer());
    },
  };
}

export { initE2eFixture };
