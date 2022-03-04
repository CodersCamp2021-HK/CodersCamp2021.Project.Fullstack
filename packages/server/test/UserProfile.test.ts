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
    console.log([resp.status, HttpStatus.OK]);
    expect(resp.status).toBe(HttpStatus.OK);
    expect(created).toEqual(expect.objectContaining(resp.body));
  });
});
