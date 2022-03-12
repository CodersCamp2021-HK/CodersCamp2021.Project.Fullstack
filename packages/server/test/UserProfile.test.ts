import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Role } from '../src/shared';
import { initE2eFixture } from './E2eFixture';
import { accessTokenAsCookie } from './shared';

const PATH = '/api/users/profile';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  afterEach(async () => {
    await fixture.db.userModel.deleteMany();
  });

  it('GET /', async () => {
    // Given
    const user = {};

    const created = await fixture.db.userModel.create(user);
    const id = created._id?.toString();
    const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role: Role.User, sub: id }));

    // When
    const resp = await fixture.agent().get(PATH).set('Cookie', [accessToken]).send();

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(created).toEqual(expect.objectContaining(resp.body));
  });

  it('PUT /', async () => {
    // Given
    const user = {
      name: 'User',
      profileCompleted: false,
    };
    const created = await fixture.db.userModel.create(user);
    const id = created._id?.toString();
    const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role: Role.User, sub: id }));
    const reqBody = {
      name: 'John',
      surname: 'Doe',
      phoneNumber: '898767545',
      card: { number: '4562574783836030', expirationDate: '2022-11-01', securityCode: '722' },
    };

    // When
    const resp_put = await fixture.agent().put(PATH).set('Cookie', [accessToken]).send(reqBody);

    // Then
    expect(resp_put.status).toBe(HttpStatus.NO_CONTENT);

    const resp_get = await fixture.agent().get(PATH).set('Cookie', [accessToken]).send();
    expect(resp_get.body.name).toEqual(reqBody.name);
    expect(resp_get.body.surname).toEqual(reqBody.surname);
    expect(resp_get.body.phoneNumber).toEqual(reqBody.phoneNumber);
    expect(resp_get.body.card).toEqual(reqBody.card);
    expect(resp_get.body.profileCompleted).toEqual(true);
  });
});
