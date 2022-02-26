import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { EMAIL } from '../../shared';

function ApiEmailProperty(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      format: EMIAL_FORMAT_KEY,
      maxLength: EMAIL.MAX_LEN,
      example: 'user@email.com',
      description: 'RFC 5322 standard email format',
    }),
  );
}

const EMIAL_FORMAT_KEY = 'email';

const ApiEmailFormat = Object.freeze({
  name: EMIAL_FORMAT_KEY,
  type: 'string' as const,
  validate: (v: string) => EMAIL.REGEX.test(v),
});

export { ApiEmailFormat, ApiEmailProperty };
