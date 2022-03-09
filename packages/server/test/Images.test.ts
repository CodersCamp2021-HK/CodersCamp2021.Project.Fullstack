import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import fs from 'fs/promises';
import path from 'path';

import { Role } from '../src/shared';
import { dishDto } from './ApiDtoUtils';
import { initE2eFixture } from './E2eFixture';
import { accessTokenAsCookie } from './shared';

async function prepareRestaurantAndFile(fixture) {
  const restaurantDocument = await fixture.db.restaurantModel.create({});
  const sub = restaurantDocument._id?.toString();
  const accessToken = accessTokenAsCookie(fixture.app.get(JwtService).sign({ role: Role.Partner, sub }));

  const filePath = path.join(__dirname, 'data/logo.webp');
  const fileBuffer = await fs.readFile(filePath);

  return { sub, accessToken, filePath, fileBuffer };
}

const PATH = '/api/img';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  afterEach(async () => {
    await fixture.db.restaurantModel.deleteMany();
    await fixture.db.dishModel.deleteMany();
  });

  test('PUT /upload-restaurant', async () => {
    // Given
    const { sub, accessToken, filePath, fileBuffer } = await prepareRestaurantAndFile(fixture);

    // When
    const uploadResp = await fixture.req
      .put(`${PATH}/upload-restaurant`)
      .set('Cookie', [accessToken])
      .attach('file', filePath);

    const downloadResp = await fixture.req.get(`${PATH}/restaurant/${sub}`);

    // Then
    expect(uploadResp.status).toBe(HttpStatus.OK);

    expect(downloadResp.status).toBe(HttpStatus.OK);
    expect(downloadResp.body).toEqual(fileBuffer);
  });

  test('PUT /upload-dish/:id', async () => {
    // Given
    const { sub, accessToken, filePath, fileBuffer } = await prepareRestaurantAndFile(fixture);

    const dishDocument = await fixture.db.dishModel.create({ ...dishDto(), restaurant: sub });
    const dishId = dishDocument._id?.toString();

    // When
    const uploadResp = await fixture.req
      .put(`${PATH}/upload-dish/${dishId}`)
      .set('Cookie', [accessToken])
      .attach('file', filePath);

    const downloadResp = await fixture.req.get(`${PATH}/dish/${dishId}`);

    // Then
    expect(uploadResp.status).toBe(HttpStatus.OK);

    expect(downloadResp.status).toBe(HttpStatus.OK);
    expect(downloadResp.body).toEqual(fileBuffer);
  });

  test('Image upload errors', async () => {
    // Given
    const { accessToken } = await prepareRestaurantAndFile(fixture);
    const request = () => fixture.req.put(`${PATH}/upload-restaurant`);

    // Requester is not authenticated
    const resp1 = await request();
    expect(resp1.status).toEqual(HttpStatus.UNAUTHORIZED);

    // File with illegal content type attached
    const resp2 = await request().set('Cookie', [accessToken]).attach('file', path.join(__dirname, '../package.json'));
    expect(resp2.status).toEqual(HttpStatus.BAD_REQUEST);
  });
});
