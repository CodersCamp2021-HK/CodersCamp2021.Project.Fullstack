import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { env } from '../Env';

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_URL, {
      authSource: 'admin',
    }),
  ],
})
class MongoModule {}

export { MongoModule };
