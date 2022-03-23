import { HttpStatus } from '@nestjs/common';
import _ from 'lodash';

import { dishDto, initE2eFixture } from './shared';

const PATH = '/api/dishes';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('GET /', async () => {
    // Given
    const restaurantIds = await Promise.all(_.times(3, () => fixture.db.restaurantModel.create({}).then((r) => r.id)));
    const dishes = restaurantIds.map((id) => dishDto({ restaurant: id }));
    await fixture.db.dishModel.create(dishes);

    // When
    const res = await fixture.req.get(PATH);

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toHaveLength(dishes.length);
  });

  it('GET /:id', async () => {
    // Given
    const dish = dishDto({ restaurant: '6200218668fc82e7bdf15090' });
    const created = await fixture.db.dishModel.create(dish);
    const id = created._id?.toString();

    // When
    const res = await fixture.req.get(`${PATH}/${id}`);

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body).toEqual(expect.objectContaining(dish));
  });
});
