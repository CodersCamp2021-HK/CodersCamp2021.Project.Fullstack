import { HttpStatus } from '@nestjs/common';

import { initE2eFixture, restaurantDto } from './shared';

const PATH = '/api/restaurants';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('GET /', async () => {
    // Given
    const restaurantsWithCompletedProfile = [
      restaurantDto({
        logo: {
          data: {
            $binary: '',
            $type: '0',
          },
          contentType: 'image/png',
        },
        addressId: [],
        cuisineType: [],
        description: 'Opis restauracji 1.',
        id: '623774489efe8105017a2521',
        name: 'Resto bar 1',
        tags: [],
        bankAccountNumber: '11111111111111111111111111',
      }),
      restaurantDto({
        logo: {
          data: {},
        },
        addressId: [],
        cuisineType: [],
        description: 'Opis restauracji 1.',
        id: '623774489efe8105017a2521',
        name: 'Resto bar 1',
        tags: [],
        bankAccountNumber: '11111111111111111111111111',
      }),
    ];
    const restaurantsWithoutCompletedProfile = [restaurantDto()];
    const restaurants = [...restaurantsWithCompletedProfile, ...restaurantsWithoutCompletedProfile];
    await fixture.db.restaurantModel.create(restaurants);

    // When
    const resp = await fixture.req.get(PATH);

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(resp.body.data).toHaveLength(restaurantsWithCompletedProfile.length);
  });

  it('GET /:id', async () => {
    // Given
    const restaurant = restaurantDto();
    const created = await fixture.db.restaurantModel.create(restaurant);
    const id = created._id?.toString();

    // When
    const resp = await fixture.req.get(`${PATH}/${id}`);

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(created).toEqual(expect.objectContaining(resp.body));
  });
});
