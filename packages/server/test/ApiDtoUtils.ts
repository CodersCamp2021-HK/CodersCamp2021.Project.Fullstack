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

export { loginDto, registerPartnerDto, registerUserDto };
