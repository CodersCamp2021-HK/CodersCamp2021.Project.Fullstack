import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { NIP } from '../../shared';

function ApiNipProperty(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      pattern: NIP.REGEX.source,
      maxLength: NIP.MAX_LEN,
      example: '1234563218',
    }),
  );
}

export { ApiNipProperty };
