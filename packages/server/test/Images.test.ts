import { HttpStatus } from '@nestjs/common';
import fs from 'fs';
import { ObjectId } from 'mongodb';
import path from 'path';

import { Role } from '../src/shared';
import { dishDto, initE2eFixture } from './shared';

const PATH = '/api/img';
const FILE_PATH = path.join(__dirname, 'data/logo.webp');
const FILE_BUFFER = fs.readFileSync(FILE_PATH);
const FILE_PATH_ILLEGAL_CONTENT_TYPE = path.join(__dirname, '../package.json');

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  test('PUT /upload-restaurant', async () => {
    // Given
    const restaurantDocument = await fixture.db.restaurantModel.create({});
    const id = restaurantDocument._id?.toString();
    const agent = fixture.agent(Role.Partner, id);

    // When
    const uploadResp = await agent.put(`${PATH}/upload-restaurant`).attach('file', FILE_PATH);

    // Then
    expect(uploadResp.status).toBe(HttpStatus.OK);

    // When
    const downloadResp = await agent.get(`${PATH}/restaurant/${id}`);

    // Then
    expect(downloadResp.status).toBe(HttpStatus.OK);
    expect(downloadResp.body).toEqual(FILE_BUFFER);
  });

  test('PUT /upload-dish/:id', async () => {
    // Given
    const id = new ObjectId().toString();
    const dishDocument = await fixture.db.dishModel.create({ ...dishDto(), restaurant: id });
    const dishId = dishDocument._id?.toString();
    const agent = fixture.agent(Role.Partner, id);

    // When
    const uploadResp = await agent.put(`${PATH}/upload-dish/${dishId}`).attach('file', FILE_PATH);

    // Then
    expect(uploadResp.status).toBe(HttpStatus.OK);

    // When
    const downloadResp = await agent.get(`${PATH}/dish/${dishId}`);

    // Then
    expect(downloadResp.status).toBe(HttpStatus.OK);
    expect(downloadResp.body).toEqual(FILE_BUFFER);
  });

  describe('Image upload errors', () => {
    test('Requester is not authenticated', async () => {
      // When
      const res = await fixture.req.put(`${PATH}/upload-restaurant`);

      // Then
      expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
    });

    test('File with illegal content type attached', async () => {
      // Given
      const agent = fixture.agent(Role.Partner);

      // When
      const res = await agent.put(`${PATH}/upload-restaurant`).attach('file', FILE_PATH_ILLEGAL_CONTENT_TYPE);

      // Then
      expect(res.status).toEqual(HttpStatus.BAD_REQUEST);
    });
  });
});
