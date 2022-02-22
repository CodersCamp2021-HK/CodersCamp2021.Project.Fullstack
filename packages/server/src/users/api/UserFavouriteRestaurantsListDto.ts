import { ApiProperty } from '@nestjs/swagger';

class UserFavouriteRestaurantsDto {
  @ApiProperty()
  pages: number;
}

export { UserFavouriteRestaurantsDto };
