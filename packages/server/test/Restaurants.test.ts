import { HttpStatus } from '@nestjs/common';

import { initE2eFixture } from './E2eFixture';

const PATH = '/api/restaurants';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  afterEach(async () => {
    await fixture.db.restaurantModel.deleteMany();
  });

  it('GET /', async () => {
    // Given
    const restaurants = [
      {
        name: 'Restaurant 1',
        description: 'Test!',
        cuisineType: ['włoska'],
        tags: ['pizza'],
        profileCompleted: true,
      },
      { name: 'Restaurant 2', profileCompleted: false },
      {
        name: 'Restaurant 3',
        description: 'Test!',
        profileCompleted: true,
      },
    ];
    await fixture.db.restaurantModel.create(restaurants);

    // When
    const resp = await fixture.req.get(PATH);

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(resp.body.data).toHaveLength(restaurants.filter((rest) => rest?.profileCompleted).length);
  });

  it('GET /:id', async () => {
    // Given
    const restaurant = {
      name: 'Restaurant',
      description: 'Test!',
      cuisineType: ['włoska'],
      tags: ['pizza'],
      dishes: [],
      profileCompleted: true,
    };
    const created = await fixture.db.restaurantModel.create(restaurant);
    const id = created._id?.toString();

    // When
    const resp = await fixture.req.get(`${PATH}/${id}`);

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(created).toEqual(expect.objectContaining(resp.body));
  });
});
