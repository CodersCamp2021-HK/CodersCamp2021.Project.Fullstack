import { Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { Express, Response } from 'express';

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

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}

export { ImageController };
