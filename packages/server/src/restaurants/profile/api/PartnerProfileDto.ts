import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

import { ApiPhoneNumberProperty } from '../../../auth/api/decorators';
import { RestaurantDto } from '../../api/RestaurantDto';
import { RESTAURANT_CONSTANTS } from '../../database';

class PartnerProfileDto extends PickType(RestaurantDto, ['id', 'name', 'description', 'cuisineType', 'tags'] as const) {
  @ApiProperty({
    pattern: RESTAURANT_CONSTANTS.BANK_ACCOUNT_NUMBER.REGEX.source,
    example: '72920080748556126838146923',
  })
  readonly bankAccountNumber: string;

  @ApiPhoneNumberProperty()
  readonly phoneNumber: string;
}

class UpdatePartnerProfileDto extends OmitType(PartnerProfileDto, ['id'] as const) {}

export { PartnerProfileDto, UpdatePartnerProfileDto };
