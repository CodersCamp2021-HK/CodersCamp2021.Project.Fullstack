import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { EMAIL } from '../../shared';

function ApiEmailProperty(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      pattern: EMAIL.REGEX.source,
      maxLength: EMAIL.MAX_LEN,
      example: 'user@email.com',
    }),
  );
}

export { ApiEmailProperty };
