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

  afterEach(async () => {
    await fixture.db.dishModel.deleteMany();
  });

  it('GET /', async () => {
    // Given
    const accessToken = accessTokenAsCookie(
      fixture.app.get(JwtService).sign({ role: Role.Partner, sub: RESTAURANT_ID }),
    );
    const dishes = [
      dishDto({ restaurant: RESTAURANT_ID }),
      dishDto({ restaurant: RESTAURANT_ID }),
      dishDto({ restaurant: RESTAURANT_ID }),
      dishDto({ restaurant: '6200218668fc82e7bdf15089' }),
    ];
    await fixture.db.dishModel.create(dishes);

    // When
    const res = await fixture.req.get(PATH).set('Cookie', [accessToken]);

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toHaveLength(3);
  });

  it('POST /', async () => {
    // Given
    const accessToken = accessTokenAsCookie(
      fixture.app.get(JwtService).sign({ role: Role.Partner, sub: RESTAURANT_ID }),
    );
    const reqBody: CreateDishDto = dishDto();

    // When
    const res = await fixture.agent().post(PATH).set('Cookie', [accessToken]).send(reqBody);

    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body).toEqual(expect.objectContaining(reqBody));
  });

  it('PUT /:id', async () => {
    // Given
    const accessToken = accessTokenAsCookie(
      fixture.app.get(JwtService).sign({ role: Role.Partner, sub: RESTAURANT_ID }),
    );
    const dish = dishDto({ restaurant: RESTAURANT_ID });
    const created = await fixture.db.dishModel.create(dish);
    const id = created._id?.toString();
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
    };

    // When;
    const resp_put = await fixture.agent().put(`${PATH}/${id}`).set('Cookie', [accessToken]).send(reqBody);
    // Then
    expect(resp_put.status).toBe(HttpStatus.NO_CONTENT);

    const resp_get = await fixture.req.get(PATH).set('Cookie', [accessToken]);
    expect(resp_get.body.data[0].name).toEqual(reqBody.name);
    expect(resp_get.body.data[0].mealType).toEqual(reqBody.mealType);
    expect(resp_get.body.data[0].description).toEqual(reqBody.description);
    expect(resp_get.body.data[0].price).toEqual(reqBody.price);
    expect(resp_get.body.data[0].tags).toEqual(reqBody.tags);
    expect(resp_get.body.data[0].ingredients).toEqual(reqBody.ingredients);
    expect(resp_get.body.data[0].allergens).toEqual(reqBody.allergens);
    expect(resp_get.body.data[0].portionWeight).toEqual(reqBody.portionWeight);
    expect(resp_get.body.data[0].fats).toEqual(reqBody.fats);
    expect(resp_get.body.data[0].proteins).toEqual(reqBody.proteins);
    expect(resp_get.body.data[0].carbohydrates).toEqual(reqBody.carbohydrates);

    // When
    const wrong_token_resp = await fixture.agent().put(`${PATH}/${id}`).set('Cookie', ['21321312']).send(reqBody);
    //Then
    expect(wrong_token_resp.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it('DELETE /:id', async () => {
    // Given
    const accessToken = accessTokenAsCookie(
      fixture.app.get(JwtService).sign({ role: Role.Partner, sub: RESTAURANT_ID }),
    );
    const dish = dishDto({ restaurant: RESTAURANT_ID });
    const created = await fixture.db.dishModel.create(dish);
    const id = created._id?.toString();

    // When;
    const res0 = await fixture.agent().delete(`${PATH}/${id}`).set('Cookie', [accessToken]);

    // Then
    expect(res0.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const res1 = await fixture.agent().delete(`${PATH}/${id}`).set('Cookie', [accessToken]);

    // Then
    expect(res1.status).toBe(HttpStatus.NOT_FOUND);
  });
});
