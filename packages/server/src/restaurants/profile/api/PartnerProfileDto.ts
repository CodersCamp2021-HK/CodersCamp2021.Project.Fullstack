import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { AddressDto } from '../../../addresses/api/AddressDto';
import { ApiPhoneNumberProperty } from '../../../auth/api/decorators';
import { RestaurantDto } from '../../api/RestaurantDto';
import { RESTAURANT_CONSTANTS } from '../../database';

/*
TODO: once #41 gets merged, update:
- type -> cuisineType
- pick description from RestaurantDto using PickType instead of declaring here
*/
class PartnerProfileDto extends PickType(RestaurantDto, ['id', 'name', 'type', 'tags'] as const) {
  @ApiProperty({
    pattern: RESTAURANT_CONSTANTS.BANK_ACCOUNT_NUMBER.REGEX.source,
    example: '72920080748556126838146923',
  })
  readonly bankAccountNumber: string;

  @ApiPhoneNumberProperty()
  readonly phoneNumber: string;

  // NOTE: possibly move this to RestaurantDto and pick? (user searching for a restaurant should see its address)
  @Type(() => AddressDto)
  @ApiProperty({
    type: [AddressDto],
  })
  readonly addressId: AddressDto[];

  @ApiProperty({
    maxLength: RESTAURANT_CONSTANTS.DESCRIPTION.MAX_LENGTH,
    example: 'Opis restauracji.',
  })
  readonly description: string;
}

class UpdatePartnerProfileDto extends OmitType(PartnerProfileDto, ['id'] as const) {}

export { PartnerProfileDto, UpdatePartnerProfileDto };
