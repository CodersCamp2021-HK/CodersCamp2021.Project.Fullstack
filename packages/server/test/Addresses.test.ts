import { HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { Role } from '../src/shared';
import { addressDto, initE2eFixture } from './shared';

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

  it.each(ENDPOINT_ROLES)('GET / (role:$role) (path:$path)', async ({ role, path }) => {
    // Given
    const owner = new ObjectId().toString();
    const agent = fixture.agent(role, owner);
    const addresses = [
      { ...addressDto(), owner },
      { ...addressDto(), owner },
      { ...addressDto(), owner },
    ];
    await fixture.db.addressModel.create(addresses);

    // When
    const res = await agent.get(`${path}/`);

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toHaveLength(addresses.length);
  });

  it.each(ENDPOINT_ROLES)('GET /:id (role:$role) (path:$path)', async ({ role, path }) => {
    // Given
    const owner = new ObjectId().toString();
    const agent = fixture.agent(role, owner);

    const address = addressDto();
    const created = await fixture.db.addressModel.create({ ...address, owner });
    const id = created._id?.toString();

    // When
    const res = await agent.get(`${path}/${id}`);

    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(created).toEqual(expect.objectContaining(res.body));
  });

  it.each(ENDPOINT_ROLES)('POST / (role:$role) (path:$path)', async ({ role, path }) => {
    // Given
    const sub = new ObjectId().toString();
    const reqBody = addressDto();
    const agent = fixture.agent(role, sub);

    // When
    const res = await agent.post(path).send(reqBody);

    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body).toEqual(expect.objectContaining(reqBody));
  });

  it.each(ENDPOINT_ROLES)('PUT / (role:$role) (path:$path)', async ({ role, path }) => {
    // Given
    const owner = new ObjectId().toString();
    const agent = fixture.agent(role, owner);
    const addresses = [
      { ...addressDto(), owner },
      { ...addressDto(), owner },
      { ...addressDto(), owner },
    ];
    const addressesList = await fixture.db.addressModel.create(addresses);
    const addressId = addressesList[0]._id;

    // When
    const res0 = await agent.put(`${path}/${addressId}`);

    // Then
    expect(res0.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const res1 = await agent.get(`${path}/`);

    // Then
    expect(res1.status).toBe(HttpStatus.OK);
    expect(res1.body.data).toHaveLength(addresses.length - 1);
  });
});
