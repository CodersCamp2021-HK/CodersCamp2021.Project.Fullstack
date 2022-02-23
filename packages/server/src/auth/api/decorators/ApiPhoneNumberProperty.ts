import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { PHONE_NUMBER } from '../../shared';

function ApiPhoneNumberProperty(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      pattern: PHONE_NUMBER.REGEX.source,
      maxLength: PHONE_NUMBER.MAX_LEN,
      example: '800500300',
    }),
  );
}

export { ApiPhoneNumberProperty };
