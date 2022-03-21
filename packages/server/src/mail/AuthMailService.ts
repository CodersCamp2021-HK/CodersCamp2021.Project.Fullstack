import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthMailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    const url = `exampleurl.com?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@example.com>',
      subject: 'Gratulacje! Potwierdź swój email.',
      template: 'templates/user_confirmation',
      context: {
        name: email,
        url,
      },
    });
  }
}
