import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';

import { FavouriteRestaurantDto } from '../../restaurants/api/RestaurantDto';
import { FavouriteDishDto } from '../../restaurants/dishes/api/DishDto';
import { ApiObjectIdProperty } from '../../shared';

class UserDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiPropertyOptional()
  readonly name: string;

  @ApiPropertyOptional()
  readonly surname: string;

  @ApiPropertyOptional()
  readonly phoneNumber: string;

  @ApiPropertyOptional()
  readonly addressId: string[];

  @ApiProperty({ type: [FavouriteRestaurantDto] })
  readonly favouriteRestaurants: FavouriteRestaurantDto[];

  @ApiProperty({ type: [FavouriteDishDto] })
  readonly favouriteDishes: FavouriteDishDto[];

  @ApiProperty()
  readonly orders: string[];

  @ApiProperty({
    default: false,
  })
  readonly profileCompleted: boolean;
}

class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

class UpdateUserDto extends CreateUserDto {}
export { CreateUserDto, UpdateUserDto, UserDto };
