import { HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { SuperAgentTest } from 'supertest';

import { addressDto, dishDto, initE2eFixture, orderDto, userDto } from './shared';

describe('User flow', () => {
  const fixture = initE2eFixture();
  let agent: SuperAgentTest;

  beforeAll(() => {
    agent = fixture.agent();
  });

  it('Register user', async () => {
    // Given
    const registrationData = {
      email: 'user@email.com',
      password: 'Password1',
    };

    // When
    const registerRes = await agent.post('/api/auth/register/user').send(registrationData);

    // Then
    expect(registerRes.status).toBe(HttpStatus.CREATED);
  });

  it('Login user', async () => {
    // Given
    const loginData = {
      email: 'user@email.com',
      role: 'User',
      password: 'Password1',
      rememberMe: false,
    };

    // When
    const loginRes = await agent.post('/api/auth/login').send(loginData);

    // Then
    expect(loginRes.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('Update user profile', async () => {
    // Given
    const userProfile = userDto();

    // When
    const updateProfileRes = await agent.put('/api/users/profile').send(userProfile);

    // Then
    expect(updateProfileRes.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const getProfileRes = await agent.get('/api/users/profile');

    // Then
    expect(getProfileRes.status).toBe(HttpStatus.OK);
    expect(getProfileRes.body.name).toEqual(userProfile.name);
    expect(getProfileRes.body.surname).toEqual(userProfile.surname);
    expect(getProfileRes.body.phoneNumber).toEqual(userProfile.phoneNumber);
    expect(getProfileRes.body.card).toEqual(userProfile.card);
  });

  it('Add address', async () => {
    // Given
    const address = addressDto();

    // When
    const addAddressResp = await agent.post('/api/users/addresses').send(address);

    // Then
    expect(addAddressResp.status).toBe(HttpStatus.CREATED);
    expect(addAddressResp.body).toEqual(expect.objectContaining(address));

    // When
    const getAddressesResp = await agent.get('/api/users/addresses');

    // Then
    expect(getAddressesResp.status).toBe(HttpStatus.OK);
    expect(getAddressesResp.body.data).toHaveLength(1);
  });

  it('Create order', async () => {
    // Given
    const { id: dishId } = await fixture.db.dishModel.create({ ...dishDto(), restaurant: new ObjectId().toString() });
    const order = orderDto({}, dishId);

    // When
    const createOrderResp = await agent.post('/api/orders').send(order);

    // Then
    expect(createOrderResp.status).toBe(HttpStatus.CREATED);
    expect(createOrderResp.body.subOrders[0].dishes).toEqual([{ dishId, count: 1, excludedIngredients: [] }]);
  });
});
