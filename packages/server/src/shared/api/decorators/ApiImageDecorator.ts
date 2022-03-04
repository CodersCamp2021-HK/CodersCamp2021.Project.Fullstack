import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { ImageType } from '../../../image/shared';

const IMAGE_URL_SCHEMA = Object.freeze({
  type: 'string',
  pattern: /\/api\/img\/(restaurant|dish)\/[0-9a-fA-F]{24}$/.source,
  example: '/api/img/restaurant/6200218668fc82e7bdf15088',
});

function ApiImage(type: ImageType): PropertyDecorator {
  return applyDecorators(
    ApiProperty({ required: false, ...IMAGE_URL_SCHEMA }),
    Transform(({ obj, value }) => (value ? `/api/img/${type}/${obj.id}` : undefined)),
  );
}

export { ApiImage };
