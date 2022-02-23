import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../shared';
import { ApiEmailProperty, ApiPasswordProperty } from './decorators';

class LoginDto {
  @ApiEmailProperty()
  email: string;

  @ApiProperty({ enum: Role, enumName: 'Role' })
  role: Role;

  @ApiPasswordProperty()
  password: string;

  @ApiProperty()
  rememberMe: boolean;
}

export { LoginDto };
