import { ApiEmailProperty, ApiPasswordProperty } from './decorators';

class RegisterAsUserDto {
  @ApiEmailProperty()
  readonly email: string;

  @ApiPasswordProperty()
  readonly password: string;
}

export { RegisterAsUserDto };
