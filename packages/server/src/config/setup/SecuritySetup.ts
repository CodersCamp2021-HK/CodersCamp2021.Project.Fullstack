import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { env } from '../Env';

function setupSecurity(app: INestApplication) {
  app.use(cookieParser());

  if (env.NODE_ENV !== 'development') {
    app.enableCors({ origin: 'http://localhost:3000' });
  }

  if (env.NODE_ENV === 'production') {
    app.use(helmet());
  }
  return app;
}

export { setupSecurity };
