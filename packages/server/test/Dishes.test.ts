import { HttpStatus } from '@nestjs/common';

import { CreateDishDto } from '../src/restaurants/dishes/api/DishDto';
import { dishDto } from './ApiDtoUtils';
import { initE2eFixture } from './E2eFixture';

const PATH = '/api/partner/dishes';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('POST /', async () => {
    // Given
    const reqBody: CreateDishDto = dishDto();

    // When
    const res = await fixture.req.post(PATH).send(reqBody);

    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body).toEqual(expect.objectContaining(reqBody));
  });
});
