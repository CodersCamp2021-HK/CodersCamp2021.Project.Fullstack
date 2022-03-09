import { ApiProperty } from '@nestjs/swagger';

import { IMAGE_URL_SCHEMA } from '../../shared';

class UploadedImageDto {
  @ApiProperty(IMAGE_URL_SCHEMA)
  readonly url: string;
}

export { UploadedImageDto };
