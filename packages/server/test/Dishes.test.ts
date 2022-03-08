import { HttpStatus } from '@nestjs/common';

import { dishDto } from './ApiDtoUtils';
import { initE2eFixture } from './E2eFixture';

const PATH = '/api/dishes';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('GET /', async () => {
    // Given
    const dishes = [
      dishDto({ restaurant: '6200218668fc82e7bdf15087' }),
      dishDto({ restaurant: '6200218668fc82e7bdf15088' }),
      dishDto({ restaurant: '6200218668fc82e7bdf15089' }),
    ];
    await fixture.db.dishModel.create(dishes);

    // When
    const res = await fixture.req.get(PATH);

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toHaveLength(dishes.length);
  });
});
