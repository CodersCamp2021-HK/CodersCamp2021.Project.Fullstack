import { ApiProperty, OmitType } from '@nestjs/swagger';

import { ApiObjectIdProperty } from '../../shared';
import { ADDRESS_CONSTANTS } from '../database';

class AddressDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiProperty({ example: 'Street' })
  readonly street: string;

  @ApiProperty({
    pattern: ADDRESS_CONSTANTS.STREET_NUMBER.REGEX.source,
    maxLength: ADDRESS_CONSTANTS.STREET_NUMBER.MAX_LENGTH,
    example: '1A',
  })
  readonly streetNumber: string;

  @ApiProperty({ required: false })
  readonly apartmentNumber: number;

  @ApiProperty({ required: false })
  readonly floor: number;

  @ApiProperty({ example: 'City' })
  readonly city: string;

  @ApiProperty({
    pattern: ADDRESS_CONSTANTS.POSTCODE.REGEX.source,
    example: '00-000',
  })
  readonly postcode: string;
}

class CreateAddressDto extends OmitType(AddressDto, ['id'] as const) {}
class UpdateAddressDto extends CreateAddressDto {}

export { AddressDto, CreateAddressDto, UpdateAddressDto };
