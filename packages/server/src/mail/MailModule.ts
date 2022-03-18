import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { env } from 'process';

import { AuthMailService } from './AuthMailService';
import { OrderMailService } from './OrderMailService';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: env.MAIL_HOST,
          secure: false,
          auth: {
            user: env.MAIL_USER,
            pass: env.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: `"No Reply" <${env.MAIL_FROM}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [AuthMailService, OrderMailService],
  exports: [AuthMailService, OrderMailService],
})
export class MailModule {}
