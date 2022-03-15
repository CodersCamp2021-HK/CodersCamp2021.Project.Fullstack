import { HttpStatus } from '@nestjs/common';

import { Role } from '../src/shared';
import { addressDto, initE2eFixture, userDto } from './shared';

const PATH = '/api/users/profile';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('GET /', async () => {
    // Given
    const user = userDto();
    const created = await fixture.db.userModel.create(user);
    const id = created._id?.toString();
    const agent = fixture.agent(Role.User, id);

    // When
    const resp = await agent.get(PATH);

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(created).toEqual(expect.objectContaining(resp.body));
  });

  it('PUT /', async () => {
    // Given
    const user = userDto();
    const created = await fixture.db.userModel.create(user);
    const id = created._id?.toString();
    const agent = fixture.agent(Role.User, id);
    const reqBody0 = {
      name: 'John',
      surname: 'Doe',
      phoneNumber: '898767545',
    };
    const reqBody1 = {
      card: { number: '4562574783836030', expirationDate: '2022-11-01', securityCode: '722' },
    };

    // When
    await agent.put(PATH).send(reqBody0);
    const res0 = await agent.get(PATH);

    // Then
    expect(res0.body.profileCompleted).toEqual(false);

    // When
    await agent.post('/api/users/addresses').send(addressDto());
    await agent.put(PATH).send(reqBody1);
    const res1 = await agent.get(PATH);

    // Then
    expect(res1.body.profileCompleted).toEqual(true);
    expect(res1.body.name).toEqual(reqBody0.name);
    expect(res1.body.surname).toEqual(reqBody0.surname);
    expect(res1.body.phoneNumber).toEqual(reqBody0.phoneNumber);
    expect(res1.body.card).toEqual(reqBody1.card);
  });
});
