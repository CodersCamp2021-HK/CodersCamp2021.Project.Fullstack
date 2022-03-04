import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

import { AddressDto } from '../../addresses/api/AddressDto';
import { ImageType } from '../../image/shared';
import { ApiObjectIdProperty } from '../../shared';
import { ApiImage } from '../../shared/api/decorators/ApiImageDecorator';
import { CuisineTypes, RESTAURANT_CONSTANTS, RestaurantTags } from '../database';

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

  @ApiImage(ImageType.RestaurantLogo)
  readonly logo: string;

  @Exclude()
  declare readonly profileCompleted: boolean;
}

class FavouriteRestaurantDto extends PickType(RestaurantDto, ['id', 'name'] as const) {}

export { FavouriteRestaurantDto, RestaurantDto };
