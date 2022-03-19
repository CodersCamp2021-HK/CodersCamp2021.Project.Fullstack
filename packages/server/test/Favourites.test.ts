import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import _ from 'lodash';
import { ObjectId } from 'mongodb';

import { FavouriteDishDto } from '../src/restaurants/dishes/api/DishDto';
import { Role } from '../src/shared';
import { dishDto, initE2eFixture } from './shared';

const PATH = '/api/users/favourite';
const RESTAURANT_ID = '6200218668fc82e7bdf15088';

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
    const createdDishes = await fixture.db.dishModel.create(_.times(5, () => dishDto({ restaurant: RESTAURANT_ID })));
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

  it('PUT /dishes/:id', async () => {
    // Given
    const createdDish = await fixture.db.dishModel.create(dishDto({ restaurant: RESTAURANT_ID }));
    const formattedDish = plainToInstance(FavouriteDishDto, createdDish);
    const dishId = formattedDish.id;
    const createdUser = await fixture.db.userModel.create({});
    const agent = fixture.agent(Role.User, createdUser.id);
    const fakeDishId = new ObjectId().toString();

    // When
    const resValid = await agent.put(`${PATH}/dishes/${dishId}`);
    const resInvalid = await agent.put(`${PATH}/dishes/${fakeDishId}`);

    // Then
    expect(resValid.status).toBe(HttpStatus.OK);
    expect(resValid.body).toEqual(formattedDish);
    expect(resInvalid.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('DELETE /dishes/:id', async () => {
    // Given
    const createdDish = await fixture.db.dishModel.create(dishDto({ restaurant: RESTAURANT_ID }));
    const createdUser = await fixture.db.userModel.create({ favouriteDishes: [createdDish] });
    const agent = fixture.agent(Role.User, createdUser.id);

    // When
    const res0 = await agent.delete(`${PATH}/dishes/${createdDish.id}`);
    const res1 = await agent.delete(`${PATH}/dishes/${createdDish.id}`);

    // Then
    expect(res0.status).toBe(HttpStatus.NO_CONTENT);
    expect(res1.status).toBe(HttpStatus.NOT_FOUND);
  });
});
