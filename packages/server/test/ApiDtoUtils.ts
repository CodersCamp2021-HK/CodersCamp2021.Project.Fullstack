import { LoginDto } from '../src/auth/api/LoginDto';
import { RegisterAsPartnerDto } from '../src/auth/api/RegisterAsPartnerDto';
import { RegisterAsUserDto } from '../src/auth/api/RegisterAsUserDto';
import { Allergens, DishTags, MealType } from '../src/restaurants/dishes/database';

function registerPartnerDto(overrides: Partial<RegisterAsPartnerDto>) {
  return {
    email: 'partner@email.com',
    password: 'Password1',
    phoneNumber: '800500300',
    nip: '1234563218',
    ...overrides,
  };
}

function registerUserDto(overrides: Partial<RegisterAsUserDto>) {
  return {
    email: 'user@email.com',
    password: 'Password1',
    ...overrides,
  };
}

function loginDto(overrides: Partial<LoginDto>) {
  return {
    email: 'user@email.com',
    password: 'Password1',
    role: 'User',
    rememberMe: false,
    ...overrides,
  };
}

function addressDto() {
  return {
    street: 'Street',
    streetNumber: '15A',
    apartmentNumber: '1',
    floor: '1',
    city: 'Default City',
    postcode: '00-000',
  };
}

function dishDto() {
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
    calories: 100,
    fats: 20,
    proteins: 20,
    carbohydrates: 20,
  };
}

export { addressDto, dishDto, loginDto, registerPartnerDto, registerUserDto };
