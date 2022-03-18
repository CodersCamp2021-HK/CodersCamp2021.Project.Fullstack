import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { Auth } from '../auth/database';

@Injectable()
export class AuthMailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Auth, token: string) {
    const url = `exampleurl.com?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Gratulacje! Potwierdź swój email.',
      template: 'templates/user_confirmation',
      context: {
        name: user.email,
        url,
      },
    });
  }
}
