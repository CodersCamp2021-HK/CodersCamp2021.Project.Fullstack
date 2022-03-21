import { HttpStatus } from '@nestjs/common';

import { CreateDishDto } from '../src/restaurants/dishes/api/DishDto';
import { Role } from '../src/shared';
import { dishDto, initE2eFixture } from './shared';

const PATH = '/api/partner/dishes';
const RESTAURANT_ID = '6200218668fc82e7bdf15088';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

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

    await fixture.db.restaurantModel.create({
      _id: RESTAURANT_ID,
      name: 'Resto',
      bankAccountNumber: '72920080748556126838146923',
      phoneNumber: '800500300',
      addressId: ['62227771b256571bb24d4b16'],
      logo: '/images/logo.png',
      description: 'Smaczenie i tanio',
      cuisineType: ['polska'],
      tags: ['burgery'],
      verified: true,
    });

    const reqBody: CreateDishDto = dishDto();

    // When
    const res = await agent.post(PATH).send(reqBody);

    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body).toEqual(expect.objectContaining(reqBody));
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
