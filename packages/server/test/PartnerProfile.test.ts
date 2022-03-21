import { HttpStatus } from '@nestjs/common';

import { Role } from '../src/shared';
import { initE2eFixture, partnerDto, restaurantDto } from './shared';

const PATH = '/api/partner/profile';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  it.each([{ restaurant: restaurantDto() }, { restaurant: restaurantDto({ verified: false }) }])(
    'GET / - verified: $restaurant.verified',
    async ({ restaurant }) => {
      // Given
      const created = await fixture.db.restaurantModel.create(restaurant);
      const id = created._id?.toString();
      const agent = fixture.agent(Role.Partner, id);

      // When
      const resp = await agent.get(PATH);

      // Then
      expect(resp.status).toBe(HttpStatus.OK);
      expect(created).toEqual(expect.objectContaining(resp.body));
    },
  );

  it('PUT /', async () => {
    // Given
    const restaurant = partnerDto();
    const created = await fixture.db.restaurantModel.create(restaurant);
    const id = created._id?.toString();
    const agent = fixture.agent(Role.Partner, id);
    const reqBody = { ...restaurant, cuisineType: ['włoska'], tags: ['wegetariańska'] };

    // When
    const res0 = await agent.put(PATH).send(reqBody);

    // Then
    expect(res0.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const res1 = await agent.get(PATH);

    // Then
    expect(res1.status).toBe(HttpStatus.OK);
    expect(res1.body.cuisineType).toEqual(reqBody.cuisineType);
    expect(res1.body.tags).toEqual(reqBody.tags);
  });
});
