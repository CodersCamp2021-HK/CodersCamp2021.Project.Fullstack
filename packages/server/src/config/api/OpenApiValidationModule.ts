import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as OpenApiValidator from 'express-openapi-validator';
import { join } from 'path';

import { env } from '../Env';

@Module({})
class OpenApiValidationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ...OpenApiValidator.middleware({
          apiSpec: join(__dirname, '..', '..', 'api.spec.json'),
          validateRequests: {
            allowUnknownQueryParameters: true,
            coerceTypes: false,
          },
          validateResponses: env.NODE_ENV !== 'production',
          validateFormats: 'full',
        }),
      )
      .forRoutes('*');
  }
}

export { OpenApiValidationModule };
