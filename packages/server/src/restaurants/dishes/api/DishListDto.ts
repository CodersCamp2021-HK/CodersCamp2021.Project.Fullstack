import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { DishDto } from './DishDto';

class DishListDto {
  @Type(() => DishDto)
  @ApiProperty({ type: [DishDto] })
  data: DishDto[];

  @ApiProperty()
  pages: number;
}

export { DishListDto };
