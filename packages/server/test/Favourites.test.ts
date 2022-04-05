import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import _ from 'lodash';
import { ObjectId } from 'mongodb';

import { FavouriteDishDto, FavouriteRestaurantDto } from '../src/favourites/api/FavouriteDtos';
import { Role } from '../src/shared';
import { dishDto, initE2eFixture, restaurantDto } from './shared';

const PATH = '/api/users/favourite';
const RESTAURANT_ID = '6200218668fc82e7bdf15088';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it('GET /restaurants', async () => {
    // Given
    const createdRestaurants = await fixture.db.restaurantModel.create(_.times(5, () => restaurantDto()));
    const formattedRestaurants = createdRestaurants.map((restaurant) =>
      plainToInstance(FavouriteRestaurantDto, restaurant),
    );
    const createdUser = await fixture.db.userModel.create({
      favouriteRestaurants: createdRestaurants.map((restaurant) => restaurant.id),
    });
    const agent = fixture.agent(Role.User, createdUser.id);

    // When
    const res = await agent.get(`${PATH}/restaurants`);

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toEqual(formattedRestaurants);
  });

  it('PUT /restaurants/:id', async () => {
    // Given
    const createdRestaurant = await fixture.db.restaurantModel.create(restaurantDto());
    const formattedRestaurant = plainToInstance(FavouriteRestaurantDto, createdRestaurant);
    const restaurantId = formattedRestaurant.id;
    const createdUser = await fixture.db.userModel.create({});
    const agent = fixture.agent(Role.User, createdUser.id);
    const fakeRestaurantId = new ObjectId().toString();

    // When
    const resValid = await agent.put(`${PATH}/restaurants/${restaurantId}`);

    // Then
    expect(resValid.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const resCheck = await agent.get(`${PATH}/restaurants`);

    // Then
    expect(resCheck.status).toBe(HttpStatus.OK);
    expect(resCheck.body.data).toEqual(expect.arrayContaining([formattedRestaurant]));

    // When
    const resInvalid = await agent.put(`${PATH}/restaurants/${fakeRestaurantId}`);

    // Then
    expect(resInvalid.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('DELETE /restaurants/:id', async () => {
    // Given
    const createdRestaurant = await fixture.db.restaurantModel.create(restaurantDto());
    const createdUser = await fixture.db.userModel.create({ favouriteRestaurants: [createdRestaurant] });
    const agent = fixture.agent(Role.User, createdUser.id);

    // When
    const res0 = await agent.delete(`${PATH}/restaurants/${createdRestaurant.id}`);

    // Then
    expect(res0.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const res1 = await agent.delete(`${PATH}/restaurants/${createdRestaurant.id}`);

    // Then
    expect(res1.status).toBe(HttpStatus.NOT_FOUND);

    // When
    const res2 = await agent.get(`${PATH}/restaurants`);

    // Then
    expect(res2.status).toBe(HttpStatus.OK);
    expect(res2.body.data).toHaveLength(0);
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

    // Then
    expect(resValid.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const resCheck = await agent.get(`${PATH}/dishes`);

    // Then
    expect(resCheck.status).toBe(HttpStatus.OK);
    expect(resCheck.body.data).toEqual(expect.arrayContaining([formattedDish]));

    // When
    const resInvalid = await agent.put(`${PATH}/dishes/${fakeDishId}`);

    // Then
    expect(resInvalid.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('DELETE /dishes/:id', async () => {
    // Given
    const createdDish = await fixture.db.dishModel.create(dishDto({ restaurant: RESTAURANT_ID }));
    const createdUser = await fixture.db.userModel.create({ favouriteDishes: [createdDish] });
    const agent = fixture.agent(Role.User, createdUser.id);

    // When
    const res0 = await agent.delete(`${PATH}/dishes/${createdDish.id}`);

    // Then
    expect(res0.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const res1 = await agent.delete(`${PATH}/dishes/${createdDish.id}`);

    // Then
    expect(res1.status).toBe(HttpStatus.NOT_FOUND);

    // When
    const res2 = await agent.get(`${PATH}/dishes`);

    // Then
    expect(res2.status).toBe(HttpStatus.OK);
    expect(res2.body.data).toHaveLength(0);
  });
});
