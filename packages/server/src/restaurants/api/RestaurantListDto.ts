import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { RestaurantDto } from './RestaurantDto';

class RestaurantListDto {
  @Type(() => RestaurantDto)
  @ApiProperty({ type: [RestaurantDto] })
  data: RestaurantDto[];

  @ApiProperty()
  pages: number;
}

export { RestaurantListDto };
