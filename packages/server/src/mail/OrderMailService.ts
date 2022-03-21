import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class OrderMailService {
  constructor(private mailerService: MailerService) {}

  async sendOrderConfirmation(email: string, orderId: string) {
    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@example.com>',
      subject: 'Gratulacje! Złożyłeś zamówienie.',
      template: 'templates/order_confirmation',
      context: {
        name: email,
        orderNumber: orderId,
      },
    });
  }
}
