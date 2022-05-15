import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { ApiObjectIdProperty } from '../../shared';
import { ADDRESS_CONSTANTS } from '../database';

@Exclude()
class AddressDto {
  @Expose()
  @ApiObjectIdProperty()
  readonly id: string;

  @Expose()
  @ApiProperty({ example: 'Street' })
  readonly street: string;

  @Expose()
  @ApiProperty({
    pattern: ADDRESS_CONSTANTS.STREET_NUMBER.REGEX.source,
    maxLength: ADDRESS_CONSTANTS.STREET_NUMBER.MAX_LENGTH,
    example: '1A',
  })
  readonly streetNumber: string;

  @Expose()
  @ApiPropertyOptional({
    pattern: ADDRESS_CONSTANTS.APARTMENT_NUMBER.REGEX.source,
    example: '1',
  })
  readonly apartmentNumber: string;

  @Expose()
  @ApiPropertyOptional({
    pattern: ADDRESS_CONSTANTS.FLOOR.REGEX.source,
    example: '1',
  })
  readonly floor: string;

  @Expose()
  @ApiProperty({ example: 'City' })
  readonly city: string;

  @Expose()
  @ApiProperty({
    pattern: ADDRESS_CONSTANTS.POSTCODE.REGEX.source,
    example: '00-000',
  })
  readonly postcode: string;
}

class CreateAddressDto extends OmitType(AddressDto, ['id'] as const) {}
class UpdateAddressDto extends CreateAddressDto {}

export { AddressDto, CreateAddressDto, UpdateAddressDto };
