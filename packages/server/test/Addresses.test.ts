import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';

import { CreateAddressDto } from '../src/addresses/api/AddressDto';
import { Role } from '../src/shared';
import { addressDto } from './ApiDtoUtils';
import { initE2eFixture } from './E2eFixture';
import { accessTokenAsCookie } from './shared';

const USER_PATH = '/api/users/addresses';
const PARTNER_PATH = '/api/partner/addresses';

const ENDPOINT_ROLES = [
  {
    role: Role.User,
    path: USER_PATH,
  },
  {
    role: Role.Partner,
    path: PARTNER_PATH,
  },
];

describe(`${USER_PATH} & ${PARTNER_PATH}`, () => {
  const fixture = initE2eFixture();

  afterEach(async () => {
    await fixture.db.addressModel.deleteMany();
  });

  it('GET /:id', async () => {
    for (const { role, path } of ENDPOINT_ROLES) {
      // Given
      const owner = new ObjectId().toString();
      const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role, sub: owner }));

      const address = addressDto();
      const created = await fixture.db.addressModel.create({ ...address, owner });
      const id = created._id?.toString();

      // When
      const res = await fixture.req.get(`${path}/${id}`).set('Cookie', [accessToken]);

      // Then
      expect(res.status).toBe(HttpStatus.OK);
      expect(created).toEqual(expect.objectContaining(res.body));
    }
  });

  it('POST /', async () => {
    for (const { role, path } of ENDPOINT_ROLES) {
      // Given
      const sub = new ObjectId().toString();
      const reqBody: CreateAddressDto = addressDto();
      const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role, sub }));

      // When
      const res = await fixture.req.post(path).set('Cookie', [accessToken]).send(reqBody);

      // Then
      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body).toEqual(expect.objectContaining(reqBody));
    }
  });
});
