import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';

import { ApiEmailProperty, ApiPhoneNumberProperty } from '../../auth/api/decorators';
import { ApiObjectIdProperty } from '../../shared';
import { Card } from '../database';

class UserDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiPropertyOptional({ example: 'Jan' })
  readonly name: string;

  @ApiPropertyOptional({ example: 'Kowalski' })
  readonly surname: string;

  @ApiEmailProperty()
  readonly email: string;

  @ApiPhoneNumberProperty()
  readonly phoneNumber: string;

  @ApiPropertyOptional({ example: { number: '4562574783836030', expirationDate: '2022-10-12', securityCode: '722' } })
  readonly card: Card;

  @ApiPropertyOptional({
    default: false,
  })
  readonly profileCompleted: boolean;
}

class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

class UpdateUserDto extends CreateUserDto {}
export { CreateUserDto, UpdateUserDto, UserDto };
