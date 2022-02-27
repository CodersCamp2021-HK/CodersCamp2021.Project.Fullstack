import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ApiObjectIdProperty } from '../../shared';
import { ShortenedDishDto } from '../dishes/api/DishDto';

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

  @Type(() => ShortenedDishDto)
  @ApiProperty({ type: [ShortenedDishDto] })
  readonly dishes: ShortenedDishDto[];
}

class FavouriteRestaurantDto extends PickType(RestaurantDto, ['id', 'name'] as const) {}

class RestaurantWithoutDishesDto extends OmitType(RestaurantDto, ['dishes'] as const) {}

export { FavouriteRestaurantDto, RestaurantDto, RestaurantWithoutDishesDto };
