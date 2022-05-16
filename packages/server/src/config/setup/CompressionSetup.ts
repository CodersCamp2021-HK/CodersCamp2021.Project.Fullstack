import { INestApplication } from '@nestjs/common';
import compression from 'compression';

function setupCompression(app: INestApplication) {
  app.use(compression());
  return app;
}

export { setupCompression };
