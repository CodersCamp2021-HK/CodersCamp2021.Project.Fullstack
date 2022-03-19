import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import _ from 'lodash';

import { FavouriteDishDto } from '../src/restaurants/dishes/api/DishDto';
import { Role } from '../src/shared';
import { dishDto, initE2eFixture } from './shared';

const PATH = '/api/users/favourite';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('GET /restaurants', async () => {
    // When
    const resp = await fixture.req.get(`${PATH}/restaurants`);

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(resp.body.data).toHaveLength(0);
  });

  it('GET /dishes', async () => {
    // Given
    const createdDishes = await fixture.db.dishModel.create(
      _.times(5, () => dishDto({ restaurant: '6200218668fc82e7bdf15088' })),
    );
    const formattedDishes = createdDishes.map((dish) => plainToInstance(FavouriteDishDto, dish));
    const createdUser = await fixture.db.userModel.create({
      favouriteDishes: createdDishes.map((dish) => dish.id),
    });
    const agent = fixture.agent(Role.User, createdUser.id);

    // When
    const resp = await agent.get(`${PATH}/dishes`);

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(resp.body.data).toEqual(formattedDishes);
  });
});
