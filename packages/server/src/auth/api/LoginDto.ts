import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../shared';
import { ApiEmailProperty, ApiPasswordProperty } from './decorators';

class LoginDto {
  @ApiEmailProperty()
  readonly email: string;

  @ApiProperty({ enum: Role, enumName: 'Role' })
  readonly role: Role;

  @ApiPasswordProperty()
  readonly password: string;

  @ApiProperty()
  readonly rememberMe: boolean;
}

export { LoginDto };
