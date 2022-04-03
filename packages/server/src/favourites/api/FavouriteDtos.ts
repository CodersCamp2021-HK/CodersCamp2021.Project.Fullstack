import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

import { RestaurantDto } from '../../restaurants/api/RestaurantDto';
import { DishDto } from '../../restaurants/dishes/api/DishDto';

@Exclude()
class FavouriteDishDto extends PickType(DishDto, ['id', 'name', 'restaurant'] as const) {}

class FavouriteDishListDto {
  @Type(() => FavouriteDishDto)
  @ApiProperty({ type: [FavouriteDishDto] })
  data: FavouriteDishDto[];

  @ApiProperty()
  pages: number;
}

@Exclude()
class FavouriteRestaurantDto extends PickType(RestaurantDto, ['id', 'name'] as const) {}

class FavouriteRestaurantListDto {
  @Type(() => FavouriteRestaurantDto)
  @ApiProperty({ type: [FavouriteRestaurantDto] })
  data: FavouriteRestaurantDto[];

  @ApiProperty()
  pages: number;
}

export { FavouriteDishDto, FavouriteDishListDto, FavouriteRestaurantDto, FavouriteRestaurantListDto };
