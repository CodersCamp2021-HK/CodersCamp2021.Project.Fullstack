import {
  BadRequestException,
  InternalServerErrorException,
  Param,
  Res,
  StreamableFile,
  UnauthorizedException,
  UploadedFile,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Express, Response } from 'express';

import {
  ApiAuthorization,
  ApiController,
  ApiFileUpload,
  ApiGet,
  ApiObjectIdParam,
  ApiUpdate,
  PartnerId,
  Role,
} from '../../shared';
import { GetImageHandler } from '../domain/GetImageHandler';
import { UploadImageHandler, UploadImageRequest, UploadImageResponse } from '../domain/UploadImageHandler';
import { ImageType } from '../shared';
import { UploadedImageDto } from './UploadedImageDto';

@ApiController({ path: 'img', name: 'Images', description: 'Operations on images' })
class ImageController {
  constructor(
    private readonly getImageHandler: GetImageHandler,
    private readonly uploadImageHandler: UploadImageHandler,
  ) {}

  @ApiGet({ path: ':type/:id', name: 'image', response: StreamableFile })
  @ApiParam({ name: 'type', enum: ImageType })
  @ApiObjectIdParam()
  async getImg(@Param('type') type: ImageType, @Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const fileData = await this.getImageHandler.exec({ type, id });
    if (!fileData) return null;

    res.set({ 'Content-Type': fileData.contentType, 'Content-Disposition': 'inline' });
    return new StreamableFile(fileData.data.buffer);
  }

  @ApiUpdate({ path: 'upload-restaurant', name: 'logo', response: UploadedImageDto })
  @ApiAuthorization(Role.Partner)
  @ApiFileUpload()
  async uploadLogo(@PartnerId() partnerId: string, @UploadedFile() file?: Express.Multer.File) {
    return this.handleUpload({
      partnerId,
      file,
      targetId: partnerId,
      type: ImageType.RestaurantLogo,
    });
  }

  @ApiUpdate({ path: 'upload-dish/:dishId', name: 'photo', response: UploadedImageDto })
  @ApiAuthorization(Role.Partner)
  @ApiFileUpload()
  @ApiObjectIdParam({ name: 'dishId' })
  async uploadPhoto(
    @PartnerId() partnerId: string,
    @Param('dishId') dishId: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.handleUpload({
      partnerId,
      file,
      targetId: dishId,
      type: ImageType.DishPhoto,
    });
  }

  private async handleUpload(uploadRequest: UploadImageRequest) {
    const uploadResult = await this.uploadImageHandler.exec(uploadRequest);

    switch (uploadResult) {
      case UploadImageResponse.Success:
        return plainToInstance(UploadedImageDto, {
          url: `${process.env.SERVER_URL}/api/img/${uploadRequest.type}/${uploadRequest.targetId}`,
        });
      case UploadImageResponse.InvalidFileGiven:
        throw new BadRequestException();
      case UploadImageResponse.RequesterUnauthorized:
        throw new UnauthorizedException();
      default:
        throw new InternalServerErrorException();
    }
  }
}

export { ImageController };
