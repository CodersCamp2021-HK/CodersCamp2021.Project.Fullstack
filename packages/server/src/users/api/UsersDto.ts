import { ApiProperty } from '@nestjs/swagger';

import { ApiObjectIdProperty } from '../../shared';
import { USER_CONSTANTS } from '../database';

class UserDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiProperty({
    minLength: USER_CONSTANTS.TITLE.MIN_LENGTH,
    maxLength: USER_CONSTANTS.TITLE.MAX_LENGTH,
  })
  readonly title: string;

  @ApiProperty({
    minLength: USER_CONSTANTS.CONTENT.MIN_LENGTH,
    maxLength: USER_CONSTANTS.CONTENT.MAX_LENGTH,
  })
  readonly content: string;
}

export { UserDto };
