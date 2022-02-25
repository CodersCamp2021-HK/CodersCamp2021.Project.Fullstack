import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { FavouriteRestaurantDto } from '../../../restaurants/api/RestaurantDto';

class FavouriteRestaurantListDto {
  @Type(() => FavouriteRestaurantDto)
  @ApiProperty({ type: [FavouriteRestaurantDto] })
  data: FavouriteRestaurantDto[];

  @ApiProperty()
  pages: number;
}

export { FavouriteRestaurantListDto };
