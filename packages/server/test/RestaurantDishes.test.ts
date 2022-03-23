import { HttpStatus } from '@nestjs/common';

import { dishDto, initE2eFixture } from './shared';

const path = (id) => `/api/restaurants/${id}/dishes`;

describe(`${path(':id')}`, () => {
  const fixture = initE2eFixture();

  it('GET /', async () => {
    // Given
    const { id: partnerId } = await fixture.db.restaurantModel.create({});
    const { id: otherId } = await fixture.db.restaurantModel.create({});
    const dishes = [
      dishDto({ restaurant: partnerId }),
      dishDto({ restaurant: partnerId }),
      dishDto({ restaurant: otherId }),
    ];
    await fixture.db.dishModel.create(dishes);

    // When
    const res = await fixture.req.get(path(partnerId));

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toHaveLength(2);
  });
});
