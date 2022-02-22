import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { UserDto } from './UsersDto';

class UserListDto {
  @Type(() => UserDto)
  @ApiProperty({ type: [UserDto] })
  data: UserDto[];

  @ApiProperty()
  pages: number;
}

export { UserListDto };
