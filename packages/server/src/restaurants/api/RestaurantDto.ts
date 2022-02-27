import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ApiObjectIdProperty } from '../../shared';
import { ShortenedDishDto } from '../dishes/api/DishDto';

// TODO: add min and max length restrictions once work on RestaurantSchema gets finished
class RestaurantDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiProperty({ example: 'Resto bar' })
  readonly name: string;

  @ApiProperty({ example: 'włoskie' })
  readonly type: string;

  @ApiProperty({ example: ['tradycyjna', 'oryginalne składniki'] })
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
