import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import request from 'supertest';

import { AppModule } from '../src/AppModule';
import { DatabaseProxy } from '../tools/database/DatabaseProxy';

function initE2eFixture() {
  let app: INestApplication;
  const db = new DatabaseProxy();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    mongoose.set('debug', true);
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
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
