import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

import { env } from '../Env';

function setupOpenApiValidator(app: INestApplication, apiSpec: OpenAPIObject) {
  const express: Application = app.getHttpAdapter().getInstance();
  express.use(
    '/api',
    bodyParser.json(),
    ...OpenApiValidator.middleware({
      apiSpec: apiSpec as unknown as OpenAPIV3.Document,
      validateRequests: {
        allowUnknownQueryParameters: true,
        coerceTypes: false,
      },
      validateResponses: env.NODE_ENV !== 'production',
      validateFormats: 'full',
    }),
  );
  return app;
}

export { setupOpenApiValidator };
