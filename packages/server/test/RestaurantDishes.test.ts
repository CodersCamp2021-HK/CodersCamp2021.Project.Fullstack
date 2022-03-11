import { HttpStatus } from '@nestjs/common';

import { dishDto } from './ApiDtoUtils';
import { initE2eFixture } from './E2eFixture';

const RESTAURANT_ID = '6200218668fc82e7bdf15088';
const PATH = `/api/restaurants/${RESTAURANT_ID}/dishes`;

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('GET /', async () => {
    // Given
    const dishes = [
      dishDto({ restaurant: RESTAURANT_ID }),
      dishDto({ restaurant: RESTAURANT_ID }),
      dishDto({ restaurant: '6200218668fc82e7bdf15089' }),
    ];
    await fixture.db.dishModel.create(dishes);

    // When
    const res = await fixture.req.get(PATH);

    console.log(res.body);

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toHaveLength(2);
  });
});
