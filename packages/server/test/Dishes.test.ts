import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateDishDto } from '../src/restaurants/dishes/api/DishDto';
import { Role } from '../src/shared';
import { dishDto } from './ApiDtoUtils';
import { initE2eFixture } from './E2eFixture';
import { accessTokenAsCookie } from './shared';

const PATH = '/api/partner/dishes';
const RESTAURANT_ID = '6200218668fc82e7bdf15088';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('GET /', async () => {
    // Given
    const accessToken = `access_token=${fixture.app
      .get(JwtService)
      .sign({ role: Role.Partner })}; Path=/; HttpOnly; SameSite=Strict`;
    const dishes = [
      dishDto({ restaurant: RESTAURANT_ID }),
      dishDto({ restaurant: RESTAURANT_ID }),
      dishDto({ restaurant: RESTAURANT_ID }),
    ];
    await fixture.db.dishModel.create(dishes);

    // When
    const res = await fixture.req.get(PATH).set('Cookie', [accessToken]);

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toHaveLength(dishes.length);
  });

  it('POST /', async () => {
    // Given
    const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role: Role.Partner }));
    const reqBody: CreateDishDto = dishDto({});

    // When
    const res = await fixture.agent().post(PATH).set('Cookie', [accessToken]).send(reqBody);

    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body).toEqual(expect.objectContaining(reqBody));
  });
});
