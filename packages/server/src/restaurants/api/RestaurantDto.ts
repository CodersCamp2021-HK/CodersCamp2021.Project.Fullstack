import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { AddressDto } from '../../addresses/api/AddressDto';
import { ApiObjectIdProperty } from '../../shared';
import { CuisineTypes, RESTAURANT_CONSTANTS, RestaurantTags } from '../database';

// TODO: Add logo
class RestaurantDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiProperty({
    minLength: RESTAURANT_CONSTANTS.NAME.MIN_LENGTH,
    maxLength: RESTAURANT_CONSTANTS.NAME.MAX_LENGTH,
    example: 'Resto bar',
  })
  readonly name: string;

  @ApiProperty({
    maxLength: RESTAURANT_CONSTANTS.DESCRIPTION.MAX_LENGTH,
    example: 'Opis restauracji.',
  })
  readonly description: string;

  @ApiProperty({ enum: CuisineTypes, enumName: 'CuisineTypeEnum', isArray: true, example: ['włoska'] })
  readonly cuisineType: CuisineTypes[];

  @ApiProperty({ enum: RestaurantTags, enumName: 'RestaurantTagEnum', isArray: true, example: ['pizza', 'zdrowa'] })
  readonly tags: RestaurantTags[];

  @Type(() => AddressDto)
  @ApiProperty({
    type: [AddressDto],
  })
  readonly addressId: AddressDto[];
}

class FavouriteRestaurantDto extends PickType(RestaurantDto, ['id', 'name'] as const) {}

export { FavouriteRestaurantDto, RestaurantDto };
