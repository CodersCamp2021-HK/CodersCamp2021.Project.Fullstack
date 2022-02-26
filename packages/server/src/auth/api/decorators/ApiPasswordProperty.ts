import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { PASSWORD } from '../../shared';

function ApiPasswordProperty(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      format: PASSWORD_FORMAT_KEY,
      maxLength: PASSWORD.MAX_LEN,
      example: 'Password1',
      description: '',
    }),
  );
}

const PASSWORD_FORMAT_KEY = 'password';

const ApiPasswordFormat = Object.freeze({
  name: PASSWORD_FORMAT_KEY,
  type: 'string' as const,
  validate: (v: string) => PASSWORD.REGEX.test(v),
});

export { ApiPasswordFormat, ApiPasswordProperty };
