import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { NIP } from '../../shared';

function ApiNipProperty(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      format: NIP_FORMAT_KEY,
      maxLength: NIP.MAX_LEN,
      example: '1234563218',
      description: 'Polish NIP number',
    }),
  );
}

const NIP_FORMAT_KEY = 'nip';

const ApiNipFormat = Object.freeze({
  name: NIP_FORMAT_KEY,
  type: 'string' as const,
  validate: (v: string) => NIP.REGEX.test(v),
});

export { ApiNipFormat, ApiNipProperty };
