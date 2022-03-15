import { HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';

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
    await fixture.db.userModel.create({ _id: userId, profileCompleted: false });

    // When
    const resp0 = await agent.post(PATH).send(reqBody);

    // Then
    expect(resp0.status).toBe(HttpStatus.FORBIDDEN);

    // When
    await fixture.db.userModel.findByIdAndUpdate(userId, { $set: { profileCompleted: true } });
    const resp1 = await agent.post(PATH).send(reqBody);

    // Then
    expect(resp1.status).toBe(HttpStatus.CREATED);
    expect(resp1.body).toEqual(expect.objectContaining({ addressId, userId }));
    expect(resp1.body.subOrders[0].dishes).toEqual([{ dishId, count: 1, excludedIngredients: [] }]);
  });
});
