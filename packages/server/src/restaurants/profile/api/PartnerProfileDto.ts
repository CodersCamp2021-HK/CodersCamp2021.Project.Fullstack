import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

import { ApiPhoneNumberProperty } from '../../../auth/api/decorators';
import { RestaurantDto } from '../../api/RestaurantDto';
import { RESTAURANT_CONSTANTS } from '../../database';

class PartnerProfileDto extends PickType(RestaurantDto, [
  'id',
  'name',
  'description',
  'cuisineType',
  'tags',
  'addressId',
  'profileCompleted',
] as const) {
  @ApiProperty({ required: false })
  declare readonly name: string;

  @ApiProperty({ required: false })
  declare readonly description: string;

  @ApiProperty({
    pattern: RESTAURANT_CONSTANTS.BANK_ACCOUNT_NUMBER.REGEX.source,
    example: '72920080748556126838146923',
    required: false,
  })
  readonly bankAccountNumber: string;

  @ApiPhoneNumberProperty({ required: false })
  readonly phoneNumber: string;
}

// TODO: remove addresId from OmitType after address case is resolved

class UpdatePartnerProfileDto extends OmitType(PartnerProfileDto, ['id', 'addressId'] as const) {}

export { PartnerProfileDto, UpdatePartnerProfileDto };
