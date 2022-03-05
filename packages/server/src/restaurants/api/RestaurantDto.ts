import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { AddressDto } from '../../addresses/api/AddressDto';
import { ApiObjectIdProperty } from '../../shared';
import { CuisineTypes, RESTAURANT_CONSTANTS, RestaurantTags } from '../database';

// TODO: Add logo
@Exclude()
class RestaurantDto {
  @Expose()
  @ApiObjectIdProperty()
  readonly id: string;

  @Expose()
  @ApiProperty({
    minLength: RESTAURANT_CONSTANTS.NAME.MIN_LENGTH,
    maxLength: RESTAURANT_CONSTANTS.NAME.MAX_LENGTH,
    example: 'Resto bar',
  })
  readonly name: string;

  @Expose()
  @ApiProperty({
    maxLength: RESTAURANT_CONSTANTS.DESCRIPTION.MAX_LENGTH,
    example: 'Opis restauracji.',
  })
  readonly description: string;

  @Expose()
  @ApiProperty({ enum: CuisineTypes, enumName: 'CuisineTypeEnum', isArray: true, example: ['włoska'] })
  readonly cuisineType: CuisineTypes[];

  @Expose()
  @ApiProperty({ enum: RestaurantTags, enumName: 'RestaurantTagEnum', isArray: true, example: ['pizza', 'zdrowa'] })
  readonly tags: RestaurantTags[];

  @Expose()
  @Type(() => AddressDto)
  @ApiProperty({
    type: [AddressDto],
  })
  readonly addressId: AddressDto[];
}

class FavouriteRestaurantDto extends PickType(RestaurantDto, ['id', 'name'] as const) {}
class UpdateRestaurantDto extends PickType(RestaurantDto, ['cuisineType', 'tags', 'addressId'] as const) {}

export { FavouriteRestaurantDto, RestaurantDto, UpdateRestaurantDto };
