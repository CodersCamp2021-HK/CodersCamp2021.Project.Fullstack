import { HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { CreateOrderDto } from '../src/orders/api/OrderDto';
import { Role } from '../src/shared';
import { initE2eFixture, orderDto } from './shared';

const PATH = '/api/orders';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('POST /', async () => {
    // Given
    const userId = new ObjectId().toString();
    const reqBody = orderDto();
    const addressId = reqBody.addressId;
    const dishId = reqBody.subOrders[0].dishes[0].dishId;
    const agent = fixture.agent(Role.User, userId);

    // When
    const resp = await agent.post(PATH).send(reqBody);

    // Then
    expect(resp.status).toBe(HttpStatus.CREATED);
    expect(resp.body).toEqual(expect.objectContaining({ addressId, userId }));
    expect(resp.body.subOrders[0].dishes).toEqual([{ dishId, count: 1, excludedIngredients: [] }]);
  });
});
