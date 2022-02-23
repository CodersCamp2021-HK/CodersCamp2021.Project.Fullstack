import { ApiEmailProperty, ApiPasswordProperty } from './decorators';

class RegisterAsUserDto {
  @ApiEmailProperty()
  email: string;

  @ApiPasswordProperty()
  password: string;
}

export { RegisterAsUserDto };
