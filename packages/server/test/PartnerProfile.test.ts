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
    const restaurants = [
      {
        name: 'Incomplete restaurant',
        phoneNumber: '123456789',
        profileCompleted: false,
      },
      {
        name: 'Completed restaurant',
        description: 'A description.',
        cuisineType: ['włoska'],
        tags: ['zdrowa', 'pizza'],
        bankAccountNumber: '72920080748556126838146923',
        phoneNumber: '123456789',
      },
    ];

    for (const restaurant of restaurants) {
      // Given
      const created = await fixture.db.restaurantModel.create(restaurant);
      const id = created._id?.toString();
      const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role: Role.Partner, sub: id }));

      // When
      const resp = await fixture.agent().get(PATH).set('Cookie', [accessToken]).send();

      // Then
      expect(resp.status).toBe(HttpStatus.OK);
      expect(created).toEqual(expect.objectContaining(resp.body));
    }
  });

  it('PUT /', async () => {
    const restaurant = {};

    // Given
    const created = await fixture.db.restaurantModel.create(restaurant);
    const id = created._id?.toString();
    const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role: Role.Partner, sub: id }));
    const reqBody = {
      cuisineType: ['włoska'],
      tags: ['wegetariańska'],
      addressId: [
        {
          id: '6200218668fc82e7bdf15088',
          street: 'Street',
          streetNumber: '1A',
          apartmentNumber: '1',
          floor: '1',
          city: 'City',
          postcode: '00-000',
        },
      ],
    };

    // When
    const resp = await fixture.agent().put(PATH).set('Cookie', [accessToken]).send(reqBody);

    // Then
    expect(resp.status).toBe(HttpStatus.NO_CONTENT);
  });
});
