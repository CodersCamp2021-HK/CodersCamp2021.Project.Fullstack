import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ApiEmailProperty, ApiPhoneNumberProperty } from '../../auth/api/decorators';
import { ApiObjectIdProperty } from '../../shared';

class CardDto {
  @ApiProperty({
    example: '4562574783836030',
  })
  readonly number: string;

  @ApiProperty({ pattern: '([0-9]{4})-(?:[0-9]{2})-([0-9]{2})', example: '2022-10-12' })
  readonly expirationDate: string;

  @ApiProperty({ example: '722' })
  readonly securityCode: string;
}
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

  @Type(() => CardDto)
  @ApiProperty({
    required: false,
    type: CardDto,
  })
  readonly card: CardDto;

  @ApiPropertyOptional({
    default: false,
  })
  readonly profileCompleted: boolean;
}

class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

class UpdateUserDto extends CreateUserDto {}
export { CreateUserDto, UpdateUserDto, UserDto };
