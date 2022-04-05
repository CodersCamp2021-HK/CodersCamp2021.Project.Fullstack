import { HttpStatus } from '@nestjs/common';
import path from 'path';
import { SuperAgentTest } from 'supertest';

import { initE2eFixture } from './shared';

const FILE_PATH = path.join(__dirname, 'data/logo.webp');

describe('Partner flow', () => {
  const fixture = initE2eFixture();
  let agent: SuperAgentTest;

  beforeAll(() => {
    agent = fixture.agent();
  });

  it('Registers partner', async () => {
    // Given
    const registrationData = {
      email: 'partner@email.com',
      password: 'Password1',
      phoneNumber: '800500300',
      nip: '1234563218',
    };

    // When
    const res = await agent.post('/api/auth/register/partner').send(registrationData);

    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
  });

  it('Authenticates partner', async () => {
    // Given
    const loginData = {
      email: 'partner@email.com',
      role: 'Partner',
      password: 'Password1',
      rememberMe: false,
    };

    // When
    const res = await agent.post('/api/auth/login').send(loginData);

    // Then
    expect(res.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('Adds a new address', async () => {
    // Given
    const addressData = {
      street: 'Street',
      streetNumber: '1A',
      apartmentNumber: '1',
      floor: '1',
      city: 'City',
      postcode: '00-000',
    };

    // When
    const res = await agent.post('/api/partner/addresses').send(addressData);

    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
  });

  it('Uploads restaurant logo', async () => {
    // When
    const uploadResp = await agent.put(`/api/img/upload-restaurant`).attach('file', FILE_PATH);

    // Then
    expect(uploadResp.status).toBe(HttpStatus.OK);
  });

  it('Completes partner profile', async () => {
    // Given
    const updateData = {
      name: 'Resto bar',
      description: 'Opis restauracji.',
      cuisineType: ['włoska'],
      tags: ['pizza', 'zdrowa'],
      operationalCities: [],
      bankAccountNumber: '72920080748556126838146923',
      phoneNumber: '800500300',
    };

    // When
    const updateRes = await agent.put('/api/partner/profile').send(updateData);

    // Then
    expect(updateRes.status).toBe(HttpStatus.NO_CONTENT);

    // When
    const profileRes = await agent.get('/api/partner/profile');
    const restaurantRes = await agent.get(`/api/restaurants/${profileRes.body.id}`);

    // Then
    expect(restaurantRes.status).toBe(HttpStatus.OK); // Only completed restaurants show up
  });

  it('Adds a new dish', async () => {
    // Given
    const dishData = {
      name: 'Danie 1',
      mealType: ['lunch', 'obiad'],
      description: 'Opis dania',
      price: 2350,
      tags: ['ostre', 'gluten free'],
      ingredients: [
        {
          name: 'bazylia',
          canBeExcluded: false,
        },
      ],
      allergens: ['orzechy'],
      portionWeight: 0,
      calories: {
        per100g: 0,
        perPortion: 0,
      },
      fats: {
        per100g: 0,
        perPortion: 0,
      },
      proteins: {
        per100g: 0,
        perPortion: 0,
      },
      carbohydrates: {
        per100g: 0,
        perPortion: 0,
      },
    };

    // When
    const res = await agent.post('/api/partner/dishes').send(dishData);

    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
  });

  it('Logs partner out', async () => {
    // When
    const res = await agent.post('/api/auth/logout');

    // Then
    expect(res.status).toBe(HttpStatus.NO_CONTENT);
  });
});
