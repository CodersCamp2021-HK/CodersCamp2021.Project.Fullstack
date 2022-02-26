import { ApiProperty, OmitType } from '@nestjs/swagger';

import { ApiObjectIdProperty } from '../../shared';
import { ADDRESS_CONSTANTS } from '../database';

class AddressDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiProperty()
  readonly street: string;

  @ApiProperty({ pattern: ADDRESS_CONSTANTS.STREET_NUMBER.REGEX.toString().slice(1, -1) })
  readonly streetNumber: string;

  @ApiProperty({ required: false })
  readonly apartmentNumber: number;

  @ApiProperty({ required: false })
  readonly floor: number;

  @ApiProperty()
  readonly city: string;

  @ApiProperty({ pattern: ADDRESS_CONSTANTS.POSTCODE.REGEX.toString().slice(1, -1) })
  readonly postcode: string;

  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;
}

class CreateAddressDto extends OmitType(AddressDto, ['id'] as const) {}
class UpdateAddressDto extends CreateAddressDto {}

export { AddressDto, CreateAddressDto, UpdateAddressDto };
