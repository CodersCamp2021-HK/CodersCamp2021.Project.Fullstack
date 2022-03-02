import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

import { PHONE_NUMBER } from '../../shared';

function ApiPhoneNumberProperty(rest?: ApiPropertyOptions): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      format: PHONE_NUMBER_FORMAT_KEY,
      maxLength: PHONE_NUMBER.MAX_LEN,
      example: '800500300',
      description: '',
      ...rest,
    }),
  );
}

const PHONE_NUMBER_FORMAT_KEY = 'phoneNumber';

const ApiPhoneNumberFormat = Object.freeze({
  name: PHONE_NUMBER_FORMAT_KEY,
  type: 'string' as const,
  validate: (v: string) => PHONE_NUMBER.REGEX.test(v),
});

export { ApiPhoneNumberFormat, ApiPhoneNumberProperty };
