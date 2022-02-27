import { LoginDto } from '../src/auth/api/LoginDto';
import { RegisterAsPartnerDto } from '../src/auth/api/RegisterAsPartnerDto';
import { RegisterAsUserDto } from '../src/auth/api/RegisterAsUserDto';

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
    apartmentNumber: 1,
    floor: 1,
    city: 'Default City',
    postcode: '00-000',
    longitude: 11.11,
    latitude: 11.11,
  };
}

export { addressDto, loginDto, registerPartnerDto, registerUserDto };
