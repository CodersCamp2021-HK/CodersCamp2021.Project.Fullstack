import { HttpStatus } from '@nestjs/common';

import { Role } from '../src/shared';
import { initE2eFixture, userDto } from './shared';

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
    const user = userDto({ profileCompleted: false });
    const created = await fixture.db.userModel.create(user);
    const id = created._id?.toString();
    const agent = fixture.agent(Role.User, id);
    const reqBody = {
      name: 'John',
      surname: 'Doe',
      phoneNumber: '898767545',
      card: { number: '4562574783836030', expirationDate: '2022-11-01', securityCode: '722' },
    };

    // When
    const res0 = await agent.put(PATH).send(reqBody);

    // Then
    expect(res0.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const res1 = await agent.get(PATH);

    // Then
    expect(res1.body.name).toEqual(reqBody.name);
    expect(res1.body.surname).toEqual(reqBody.surname);
    expect(res1.body.phoneNumber).toEqual(reqBody.phoneNumber);
    expect(res1.body.card).toEqual(reqBody.card);
  });
});
