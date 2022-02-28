import { HttpStatus } from '@nestjs/common';

import { CreateAddressDto } from '../src/addresses/api/AddressDto';
import { addressDto } from './ApiDtoUtils';
import { initE2eFixture } from './E2eFixture';

const PATH = '/api/addresses';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  afterEach(async () => {
    await fixture.db.addressModel.deleteMany();
  });

  it('GET /:id', async () => {
    // Given
    const address = addressDto();
    const created = await fixture.db.addressModel.create(address);
    const id = created._id?.toString();

    // When
    const res = await fixture.req.get(`${PATH}/${id}`);

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(created).toEqual(expect.objectContaining(res.body));
  });

  it('POST /', async () => {
    // Given
    const reqBody: CreateAddressDto = addressDto();

    // When
    const res = await fixture.req.post(PATH).send(reqBody);

    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body).toEqual(expect.objectContaining(reqBody));
  });
});
