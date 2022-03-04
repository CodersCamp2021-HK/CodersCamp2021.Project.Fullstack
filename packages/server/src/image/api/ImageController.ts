import { Param, Res, StreamableFile } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

import { ApiController, ApiGet, ApiObjectIdParam } from '../../shared';
import { GetImageHandler } from '../domain/GetImageHandler';
import { ImageType } from '../shared';

@ApiController({ path: 'img', name: 'Images', description: 'Operations on images' })
class ImageController {
  constructor(private readonly getImageHandler: GetImageHandler) {}

  @ApiGet({ path: ':type/:id', name: 'file', response: StreamableFile })
  @ApiParam({ name: 'type', enum: ImageType })
  @ApiObjectIdParam()
  async getImg(@Param('type') type: ImageType, @Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const fileData = await this.getImageHandler.exec({ type, id });
    if (!fileData) return null;

    res.set({ 'Content-Type': fileData.contentType, 'Content-Disposition': 'inline' });
    return new StreamableFile(fileData.buffer);
  }
}

export { ImageController };
