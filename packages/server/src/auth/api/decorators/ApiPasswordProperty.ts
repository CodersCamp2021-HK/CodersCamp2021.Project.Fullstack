import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { PASSWORD } from '../../shared';

function ApiPasswordProperty(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      pattern: PASSWORD.REGEX.source,
      maxLength: PASSWORD.MAX_LEN,
      example: 'Password1',
    }),
  );
}

export { ApiPasswordProperty };
