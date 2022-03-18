import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { Auth } from '../auth/database';
import { Order } from '../orders/database';

@Injectable()
export class OrderMailService {
  constructor(private mailerService: MailerService) {}

  async sendOrderConfirmation(user: Auth, order: Order) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Gratulacje! Złożyłeś zamówienie.',
      template: 'templates/order_confirmation',
      context: {
        name: user.email,
        orderNumber: order.id,
      },
    });
  }
}
