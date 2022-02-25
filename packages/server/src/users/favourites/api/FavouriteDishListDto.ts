import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { FavouriteDishDto } from '../../../restaurants/dishes/api/DishDto';

class FavouriteDishListDto {
  @Type(() => FavouriteDishDto)
  @ApiProperty({ type: [FavouriteDishDto] })
  data: FavouriteDishDto[];

  @ApiProperty()
  pages: number;
}

export { FavouriteDishListDto };
