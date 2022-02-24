import { INestApplication, Type } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import request from 'supertest';

import { AppModule } from '../src/AppModule';
import { DatabaseProxy } from '../tools/database/DatabaseProxy';

type E2eFixtureOptions = Readonly<{
  debug?: boolean;
  override?: (builder: TestingModuleBuilder) => TestingModuleBuilder;
  testControllers?: Type[];
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
        controllers: options.testControllers,
      }),
    ).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.use(cookieParser());
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

  return Object.freeze({
    get app(): Omit<INestApplication, 'init' | 'close'> {
      return app;
    },
    get db(): Omit<DatabaseProxy, 'init' | 'close'> {
      return db;
    },
    get req() {
      return request(app.getHttpServer());
    },
    agent: () => {
      return request.agent(app.getHttpServer());
    },
  });
}

export { initE2eFixture };
