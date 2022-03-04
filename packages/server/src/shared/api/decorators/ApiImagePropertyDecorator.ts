import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { ImageType } from '../../../image/shared';

const IMAGE_URL_SCHEMA = Object.freeze({
  type: 'string',
  pattern: /\/api\/img\/(restaurant|dish)\/[0-9a-fA-F]{24}$/.source,
  example: `https://coderscamp2021-hk-fullstack.herokuapp.com/api/img/restaurant/6200218668fc82e7bdf15088`,
});

function ApiImageProperty(type: ImageType): PropertyDecorator {
  return applyDecorators(
    ApiProperty({ required: false, ...IMAGE_URL_SCHEMA }),
    Transform(({ obj, value }) => (value ? `${process.env.SERVER_URL}/api/img/${type}/${obj.id}` : undefined)),
  );
}

export { ApiImageProperty, IMAGE_URL_SCHEMA };
