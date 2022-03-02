import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Role } from '../src/shared';
import { initE2eFixture } from './E2eFixture';
import { accessTokenAsCookie } from './shared';

const PATH = '/api/partner/profile';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  afterEach(async () => {
    await fixture.db.restaurantModel.deleteMany();
  });

  it('GET /', async () => {
    // Given
    const restaurant = {
      name: 'Restaurant',
      phoneNumber: '123456789',
      profileCompleted: false,
    };
    const created = await fixture.db.restaurantModel.create(restaurant);
    const id = created._id?.toString();
    const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role: Role.Partner, sub: id }));

    // When
    const resp = await fixture.agent().get(PATH).set('Cookie', [accessToken]).send();

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(created).toEqual(expect.objectContaining(resp.body));
  });
});
