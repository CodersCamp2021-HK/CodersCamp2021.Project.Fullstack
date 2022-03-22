import { HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { CreateDishDto } from '../src/restaurants/dishes/api/DishDto';
import { Role } from '../src/shared';
import { dishDto, initE2eFixture, restaurantDto } from './shared';

const PATH = '/api/partner/dishes';
const RESTAURANT_ID = '6200218668fc82e7bdf15088';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  afterEach(async () => {
    await fixture.db.dishModel.deleteMany();
  });

  it('GET /', async () => {
    // Given
    const agent = fixture.agent(Role.Partner, RESTAURANT_ID);
    const dishes = [
      dishDto({ restaurant: RESTAURANT_ID }),
      dishDto({ restaurant: RESTAURANT_ID }),
      dishDto({ restaurant: RESTAURANT_ID }),
      dishDto({ restaurant: '6200218668fc82e7bdf15089' }),
    ];
    await fixture.db.dishModel.create(dishes);

    // When
    const res = await agent.get(PATH);

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toHaveLength(3);
  });

  it('POST /', async () => {
    // Given
    const agent = fixture.agent(Role.Partner, RESTAURANT_ID);
    const reqBody: CreateDishDto = dishDto();

    // When
    const res = await agent.post(PATH).send(reqBody);

    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body).toEqual(expect.objectContaining(reqBody));
  });

  it('PUT /:id', async () => {
    // Given
    const restaurant = restaurantDto({ profileCompleted: true });
    const createRestaurant = await fixture.db.restaurantModel.create(restaurant);
    const restaurantId = createRestaurant._id?.toString();
    const agent = fixture.agent(Role.Partner, restaurantId);

    const dish = dishDto({ restaurant: restaurantId });
    const createdDish = await fixture.db.dishModel.create(dish);
    const dishId = createdDish._id?.toString();
    const reqBody = dishDto({ restaurant: restaurantId });
    await fixture.db.restaurantModel.updateOne({ dishes: createdDish });

    // When;
    const resp_put = await agent.put(`${PATH}/${dishId}`).send(reqBody);

    // Then
    expect(resp_put.status).toBe(HttpStatus.OK);

    const resp_get = await agent.get(PATH);
    expect(resp_get.body.data).toEqual(expect.arrayContaining([expect.objectContaining(reqBody)]));
  });

  it('PUT /:wrongId', async () => {
    // Given
    const agent = fixture.agent(Role.Partner, RESTAURANT_ID);
    const dish = dishDto({ restaurant: RESTAURANT_ID });
    await fixture.db.dishModel.create(dish);
    const reqBody = {
      name: 'Danie 100',
      mealType: ['śniadanie', 'lunch'],
      description: 'Nowe ekstra danie',
      price: 2400,
      tags: ['wegańska', 'ostre'],
      ingredients: [
        {
          name: 'cebula',
          canBeExcluded: true,
        },
      ],
      allergens: ['mleko'],
      portionWeight: 100,
      calories: {
        per100g: 120,
        perPortion: 10,
      },
      fats: {
        per100g: 130,
        perPortion: 20,
      },
      proteins: {
        per100g: 140,
        perPortion: 50,
      },
      carbohydrates: {
        per100g: 100,
        perPortion: 10,
      },
      updated: true,
    };

    // When
    const wrong_id = new ObjectId().toString();
    const wrong_token_resp = await agent.put(`${PATH}/${wrong_id}`).send(reqBody);
    //Then
    expect(wrong_token_resp.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('DELETE /:id', async () => {
    // Given
    const agent = fixture.agent(Role.Partner, RESTAURANT_ID);
    const dish = dishDto({ restaurant: RESTAURANT_ID });
    const created = await fixture.db.dishModel.create(dish);
    const id = created._id?.toString();

    // When;
    const res0 = await agent.delete(`${PATH}/${id}`);

    // Then
    expect(res0.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const res1 = await agent.delete(`${PATH}/${id}`);

    // Then
    expect(res1.status).toBe(HttpStatus.NOT_FOUND);
  });
});
