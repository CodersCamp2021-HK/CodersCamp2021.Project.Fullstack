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

  it('PUT /:id', async () => {
    // Given
    const address = addressDto();
    const created = await fixture.db.addressModel.create(address);
    const id = created._id?.toString();
    const reqBody: CreateAddressDto = {
      street: 'Another Street',
      streetNumber: '15',
      apartmentNumber: 2,
      floor: 2,
      city: 'Another City',
      postcode: '01-000',
      longitude: 12.11,
      latitude: 12.11,
    };

    // When
    const res = await fixture.req.put(`${PATH}/${id}`).send(reqBody);

    // Then
    expect(res.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('DELETE /:id', async () => {
    // Given
    const address = addressDto();
    const created = await fixture.db.addressModel.create(address);
    const id = created._id?.toString();

    // When
    const res0 = await fixture.req.delete(`${PATH}/${id}`);

    // Then
    expect(res0.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const res1 = await fixture.req.delete(`${PATH}/${id}`);

    // Then
    expect(res1.status).toBe(HttpStatus.NOT_FOUND);
  });
});
