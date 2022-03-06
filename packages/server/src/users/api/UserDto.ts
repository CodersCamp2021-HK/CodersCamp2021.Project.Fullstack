import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { AddressDto } from '../../addresses/api/AddressDto';
import { Order } from '../../orders/database/OrderSchema';
import { FavouriteRestaurantDto } from '../../restaurants/api/RestaurantDto';
import { Restaurant } from '../../restaurants/database/RestaurantSchema';
import { FavouriteDishDto } from '../../restaurants/dishes/api/DishDto';
import { Dish } from '../../restaurants/dishes/database/DishesSchema';
import { ApiObjectIdProperty } from '../../shared';
import { Card } from '../database';

class UserDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiPropertyOptional({ example: 'Jan' })
  readonly name: string;

  @ApiPropertyOptional({ example: 'Kowalski' })
  readonly surname: string;

  @ApiPropertyOptional({ example: 'jan@kowalski.pl' })
  readonly email: string;

  @ApiPropertyOptional({ example: '123456789' })
  readonly phoneNumber: string;

  @Type(() => AddressDto)
  @ApiPropertyOptional({
    type: [AddressDto],
  })
  readonly addressId: AddressDto[];

  @ApiPropertyOptional({ example: { number: '4562574783836030', expirationDate: '2022-10-12', securityCode: '722' } })
  readonly card: Card;

  @ApiPropertyOptional({ type: [FavouriteRestaurantDto] })
  readonly favouriteRestaurants: Restaurant[];

  @ApiPropertyOptional({ type: [FavouriteDishDto] })
  readonly favouriteDishes: Dish[];

  @ApiPropertyOptional()
  readonly orders: Order[];

  @ApiPropertyOptional({
    default: false,
  })
  readonly profileCompleted: boolean;
}

class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

class UpdateUserDto extends CreateUserDto {}
export { CreateUserDto, UpdateUserDto, UserDto };
