import { HttpStatus } from '@nestjs/common';

import { initE2eFixture } from './shared';

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
    // When
    const resp = await fixture.req.get(`${PATH}/dishes`);

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(resp.body.data).toHaveLength(0);
  });
});
