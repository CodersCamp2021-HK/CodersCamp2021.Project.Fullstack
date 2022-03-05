import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateDishDto } from '../src/restaurants/dishes/api/DishDto';
import { Role } from '../src/shared';
import { dishDto } from './ApiDtoUtils';
import { initE2eFixture } from './E2eFixture';
import { accessTokenAsCookie } from './shared';

const PATH = '/api/partner/dishes';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('POST /', async () => {
    // Given
    const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role: Role.Partner }));
    const reqBody: CreateDishDto = dishDto();

    // When
    const res = await fixture.agent().post(PATH).set('Cookie', [accessToken]).send(reqBody);

    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body).toEqual(expect.objectContaining(reqBody));
  });
});
