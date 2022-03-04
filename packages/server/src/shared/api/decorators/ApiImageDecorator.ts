import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { ImageType } from '../../../image/shared';

function ApiImage(type: ImageType): PropertyDecorator {
  return applyDecorators(
    ApiProperty({ required: false }),
    Transform(({ obj, value }) => (value ? `/api/img/${type}/${obj.id}` : undefined)),
  );
}

export { ApiImage };
