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

  it('PUT /', async () => {
    // Given
    const user = {
      name: 'User',
      profileCompleted: false,
    };
    const created = await fixture.db.userModel.create(user);
    const id = created._id?.toString();
    const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role: Role.User, sub: id }));
    const reqBody = { name: 'John', surname: 'Doe' };

    // When
    const resp = await fixture.agent().put(PATH).set('Cookie', [accessToken]).send(reqBody);

    // Then
    expect(resp.status).toBe(HttpStatus.NO_CONTENT);
  });
});
