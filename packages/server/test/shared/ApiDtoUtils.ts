import { ObjectId } from 'mongodb';

import { AddressDto } from '../../src/addresses/api/AddressDto';
import { LoginDto } from '../../src/auth/api/LoginDto';
import { RegisterAsPartnerDto } from '../../src/auth/api/RegisterAsPartnerDto';
import { RegisterAsUserDto } from '../../src/auth/api/RegisterAsUserDto';
import { Order } from '../../src/orders/database';
import { CuisineTypes, Restaurant, RestaurantTags } from '../../src/restaurants/database';
import { DishDto } from '../../src/restaurants/dishes/api/DishDto';
import { Allergens, DishTags, MealType } from '../../src/restaurants/dishes/database';
import { Role } from '../../src/shared';
import { UserDto } from '../../src/users/api/UserDto';

function registerPartnerDto(overrides?: Partial<RegisterAsPartnerDto>) {
  return {
    email: 'partner@email.com',
    password: 'Password1',
    phoneNumber: '800500300',
    nip: '1234563218',
    ...overrides,
  };
}

function registerUserDto(overrides?: Partial<RegisterAsUserDto>) {
  return {
    email: 'user@email.com',
    password: 'Password1',
    ...overrides,
  };
}

function loginDto(overrides?: Partial<LoginDto>) {
  return {
    email: 'user@email.com',
    password: 'Password1',
    role: Role.User,
    rememberMe: false,
    ...overrides,
  };
}

function addressDto(overrides?: Partial<AddressDto>) {
  return {
    street: 'Street',
    streetNumber: '15A',
    apartmentNumber: '1',
    floor: '1',
    city: 'Default City',
    postcode: '00-000',
    ...overrides,
  };
}

function dishDto(overrides?: Partial<DishDto>) {
  return {
    name: 'Danie 1',
    mealType: [MealType.Lunch, MealType.Dinner],
    description: 'Opis dania',
    price: 2350,
    tags: [DishTags.Spicy],
    ingredients: [
      { name: 'składnik 1', canBeExcluded: true },
      { name: 'składnik 2', canBeExcluded: false },
    ],
    allergens: [Allergens.Eggs],
    portionWeight: 300,
    calories: { per100g: 100, perPortion: 300 },
    fats: { per100g: 20, perPortion: 60 },
    proteins: { per100g: 20, perPortion: 60 },
    carbohydrates: { per100g: 20, perPortion: 60 },
    updated: false,
    ...overrides,
  };
}

function updateDishDto(overrides?: Partial<DishDto>) {
  return {
    name: 'Danie 1 update',
    mealType: [MealType.Lunch, MealType.Breakfast],
    description: 'Opis dania update',
    price: 1000,
    tags: [DishTags.Spicy, DishTags.GlutenFree],
    ingredients: [
      { name: 'składnik 3', canBeExcluded: false },
      { name: 'składnik 4', canBeExcluded: false },
    ],
    allergens: [Allergens.SesameSeeds],
    portionWeight: 400,
    calories: { per100g: 200, perPortion: 400 },
    fats: { per100g: 10, perPortion: 40 },
    proteins: { per100g: 20, perPortion: 50 },
    carbohydrates: { per100g: 10, perPortion: 20 },
    updated: false,
    ...overrides,
  };
}

function cardDto() {
  return {
    number: '4562574783836030',
    expirationDate: '2022-10-12',
    securityCode: '722',
  };
}

function userDto(overrides?: Partial<UserDto>) {
  return {
    name: 'Jan',
    surname: 'Kowalski',
    phoneNumber: '800500300',
    card: cardDto(),
    ...overrides,
  };
}

function restaurantDto(overrides?: Partial<Restaurant>) {
  return {
    name: 'Resto bar',
    description: 'Opis restauracji.',
    cuisineType: [CuisineTypes.Mediterranean],
    tags: [RestaurantTags.Kebab, RestaurantTags.StreetFood],
    bankAccountNumber: '72920080748556126838146923',
    phoneNumber: '800500300',
    isCompleted: true,
    ...overrides,
  };
}

function orderDto(overrides?: Partial<Order>) {
  const addressId = new ObjectId().toString();
  const dishId = new ObjectId().toString();
  return {
    addressId,
    subOrders: [
      {
        deliveryDate: new Date(),
        hourStart: 9,
        hourEnd: 12,
        dishes: [
          {
            dishId,
          },
        ],
      },
    ],
    ...overrides,
  };
}

export {
  addressDto,
  dishDto,
  loginDto,
  orderDto,
  registerPartnerDto,
  registerUserDto,
  restaurantDto,
  updateDishDto,
  userDto,
};
