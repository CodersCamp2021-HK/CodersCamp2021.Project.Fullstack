import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';

import { Address } from '../../addresses/database/AddressSchema';
import { Order } from '../../orders/database/OrderSchema';
import { FavouriteRestaurantDto } from '../../restaurants/api/RestaurantDto';
import { Restaurant } from '../../restaurants/database/RestaurantSchema';
import { FavouriteDishDto } from '../../restaurants/dishes/api/DishDto';
import { Dish } from '../../restaurants/dishes/database/DishesSchema';
import { ApiObjectIdProperty } from '../../shared';
export interface Card {
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

  @ApiPropertyOptional()
  readonly phoneNumber: string;

  @ApiPropertyOptional()
  readonly addressId: Address[];

  @ApiProperty()
  readonly card: Card;

  @ApiProperty({ type: [FavouriteRestaurantDto] })
  readonly favouriteRestaurants: Restaurant[];

  @ApiProperty({ type: [FavouriteDishDto] })
  readonly favouriteDishes: Dish[];

  @ApiProperty()
  readonly orders: Order[];

  @ApiProperty({
    default: false,
  })
  readonly profileCompleted: boolean;
}

class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

class UpdateUserDto extends CreateUserDto {}
export { CreateUserDto, UpdateUserDto, UserDto };
