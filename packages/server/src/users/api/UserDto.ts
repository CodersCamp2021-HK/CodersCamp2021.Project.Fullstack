import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ApiPhoneNumberProperty } from '../../auth/api/decorators';
import { ApiObjectIdProperty } from '../../shared';
import { USER_CONSTANTS } from './../database';

class CardDto {
  @ApiPropertyOptional({
    pattern: USER_CONSTANTS.CARD.NUMBER.REGEX.source,
    example: '4562574783836030',
  })
  readonly number: string;

  @ApiPropertyOptional({
    pattern: USER_CONSTANTS.CARD.EXPIRATION_DATE,
    example: '2022-10-12',
  })
  readonly expirationDate: string;

  @ApiPropertyOptional({
    minLength: USER_CONSTANTS.CARD.CVC.MIN_LENGTH,
    maxLength: USER_CONSTANTS.CARD.CVC.MAX_LENGTH,
    example: '722',
  })
  readonly securityCode: string;
}
class UserDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiPropertyOptional({
    minLength: USER_CONSTANTS.NAME.MIN_LENGTH,
    maxLength: USER_CONSTANTS.NAME.MAX_LENGTH,
    example: 'Jan',
  })
  readonly name: string;

  @ApiPropertyOptional({
    minLength: USER_CONSTANTS.NAME.MIN_LENGTH,
    maxLength: USER_CONSTANTS.NAME.MAX_LENGTH,
    example: 'Kowalski',
  })
  readonly surname: string;

  @ApiPhoneNumberProperty({ required: false })
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
