import { HttpStatus } from '@nestjs/common';

import { CreateOrderDto } from '../src/orders/api/OrderDto';
import { initE2eFixture } from './E2eFixture';

const PATH = '/api/orders';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  afterEach(async () => {
    await fixture.db.orderModel.deleteMany();
  });

  it('POST /', async () => {
    // Given
    const reqBody: CreateOrderDto = { addressId: '', subOrders: [], comment: '' };

    // When
    const resp = await fixture.req.post(PATH).send(reqBody);

    // Then
    expect(resp.status).toBe(HttpStatus.CREATED);
    expect(resp.body).toEqual(expect.objectContaining(reqBody));
  });
});
