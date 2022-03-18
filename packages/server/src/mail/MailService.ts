import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { Auth } from './../auth/database';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Auth, token: string) {
    const url = `exampleurl.com?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome! Confirm your email',
      template: 'templates/confirmation',
      context: {
        name: user.entityId,
        url,
      },
    });
  }
}
