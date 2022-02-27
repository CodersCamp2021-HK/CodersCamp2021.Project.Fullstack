import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';

import { FavouriteRestaurantDto } from '../../restaurants/api/RestaurantDto';
import { FavouriteDishDto } from '../../restaurants/dishes/api/DishDto';
import { ApiObjectIdProperty } from '../../shared';

interface Card {
  number: string;
  expirationDate: Date;
  securityCode: string;
}

class UserDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiPropertyOptional()
  readonly name: string;

  @ApiPropertyOptional()
  readonly surname: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiPropertyOptional()
  readonly phoneNumber: string;

  @ApiPropertyOptional()
  readonly addressId: string[];

  @ApiProperty()
  readonly card: Card;

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

class NoPasswordUserDto extends OmitType(UserDto, ['password'] as const) {}

export { NoPasswordUserDto, UserDto };
