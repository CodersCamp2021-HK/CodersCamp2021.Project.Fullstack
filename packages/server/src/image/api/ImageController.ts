import { Param, Res, StreamableFile } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

import { ApiController, ApiGet, ApiObjectIdParam } from '../../shared';
import { GetImageHandler } from '../domain/GetImageHandler';
import { ImageExtension, ImageType } from '../shared';

@ApiController({ path: 'img', name: 'Images', description: 'Operations on images' })
class ImageController {
  constructor(private readonly getImageHandler: GetImageHandler) {}

  @ApiGet({ path: ':type/:id.:ext', name: 'file', response: StreamableFile })
  @ApiParam({ name: 'type', enum: ImageType })
  @ApiObjectIdParam()
  @ApiParam({ name: 'ext', enum: ImageExtension })
  async getImg(
    @Param('type') type: ImageType,
    @Param('id') id: string,
    @Param('ext') extension: ImageExtension,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileData = await this.getImageHandler.exec({ type, id, extension });
    if (!fileData) return null;

    res.set({ 'Content-Type': fileData.contentType });
    return new StreamableFile(fileData.buffer);
  }
}

export { ImageController };
