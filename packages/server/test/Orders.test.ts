import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';

import { CreateOrderDto } from '../src/orders/api/OrderDto';
import { Role } from '../src/shared';
import { initE2eFixture } from './E2eFixture';
import { accessTokenAsCookie } from './shared';

const PATH = '/api/orders';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  afterEach(async () => {
    await fixture.db.orderModel.deleteMany();
  });

  it('POST /', async () => {
    // Given
    const userId = new ObjectId().toString();
    const addressId = new ObjectId().toString();
    const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role: Role.User, sub: userId }));

    const reqBody: CreateOrderDto = {
      addressId,
      subOrders: [],
      comment: '',
    };

    // When
    const resp = await fixture.req.post(PATH).set('Cookie', [accessToken]).send(reqBody);

    // Then
    expect(resp.status).toBe(HttpStatus.CREATED);
    expect(resp.body).toEqual(expect.objectContaining(reqBody));
  });
});
