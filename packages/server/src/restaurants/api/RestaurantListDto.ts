import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { RestaurantWithoutDishesDto } from './RestaurantDto';

class RestaurantListDto {
  @Type(() => RestaurantWithoutDishesDto)
  @ApiProperty({ type: [RestaurantWithoutDishesDto] })
  data: RestaurantWithoutDishesDto[];

  @ApiProperty()
  pages: number;
}

export { RestaurantListDto };
