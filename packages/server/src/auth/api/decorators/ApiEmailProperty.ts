import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

import { EMAIL } from '../../shared';

function ApiEmailProperty(rest?: ApiPropertyOptions): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      format: EMAIL_FORMAT_KEY,
      maxLength: EMAIL.MAX_LEN,
      example: 'user@email.com',
      description: 'RFC 5322 standard email format',
      ...rest,
    }),
  );
}

const EMAIL_FORMAT_KEY = 'email';

const ApiEmailFormat = Object.freeze({
  name: EMAIL_FORMAT_KEY,
  type: 'string' as const,
  validate: (v: string) => EMAIL.REGEX.test(v),
});

export { ApiEmailFormat, ApiEmailProperty };
