import { HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { Role } from '../src/shared';
import { dishDto, initE2eFixture, orderDto, userDto } from './shared';

const PATH = '/api/orders';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('POST / (invalid user)', async () => {
    // Given
    const agent = fixture.agent(Role.User);
    const reqBody = orderDto();

    // When
    const resp = await agent.post(PATH).send(reqBody);

    // Then
    expect(resp.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  it('POST / (invalid dish)', async () => {
    // Given
    const user = await fixture.db.userModel.create({ ...userDto(), addressId: [new ObjectId().toString()] });
    const agent = fixture.agent(Role.User, user.id);
    const reqBody = orderDto();

    // When
    const resp = await agent.post(PATH).send(reqBody);

    // Then
    expect(resp.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  it('POST / (valid request)', async () => {
    // Given
    const user = await fixture.db.userModel.create({ ...userDto(), addressId: [new ObjectId().toString()] });
    const agent = fixture.agent(Role.User, user.id);
    const dish = await fixture.db.dishModel.create({ ...dishDto(), restaurant: new ObjectId().toString() });
    const reqBody = orderDto({}, dish.id);

    // When
    const resp = await agent.post(PATH).send(reqBody);

    // Then
    expect(resp.status).toBe(HttpStatus.CREATED);
    expect(resp.body).toEqual(expect.objectContaining({ addressId: reqBody.addressId, userId: user.id }));
    expect(resp.body.subOrders[0].dishes).toEqual([{ dishId: dish.id, count: 1, excludedIngredients: [] }]);
  });
});
