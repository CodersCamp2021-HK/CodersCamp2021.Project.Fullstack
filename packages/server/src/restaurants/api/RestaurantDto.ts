import { ApiProperty, PickType } from '@nestjs/swagger';

import { ApiObjectIdProperty } from '../../shared';

class RestaurantDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly tags: string[];

  @ApiProperty()
  readonly photo: string;
}

class FavouriteRestaurantDto extends PickType(RestaurantDto, ['id', 'name'] as const) {}

export { FavouriteRestaurantDto, RestaurantDto };
