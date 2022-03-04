import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Binary } from 'mongodb';
import { Model } from 'mongoose';

import { Restaurant, RestaurantDocument } from '../../restaurants/database';
import { Dish, DishDocument } from '../../restaurants/dishes/database';
import { Handler } from '../../shared';
import { AllowedContentType, DBImage, ImageType } from '../shared';

interface UploadImageRequest {
  readonly partnerId: string;
  readonly targetId: string;
  readonly type: ImageType;
  readonly file?: Express.Multer.File;
}

enum UploadImageResponse {
  Success,
  NoFileGiven,
  FileHasUnknownExtension,
  RequesterIsNotOwner,
  ResourceNotFound,
}

class UploadImageHandler implements Handler<UploadImageRequest, UploadImageResponse> {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
  ) {}

  private async getTargetOwnerId(req: UploadImageRequest) {
    switch (req.type) {
      case ImageType.RestaurantLogo:
        return req.targetId;
      case ImageType.DishPhoto:
        return this.dishModel.findById(req.targetId).then((document) => document?.restaurant?.toString() ?? null);
      default:
        return null;
    }
  }

  private async addToModel(req: UploadImageRequest) {
    const dbImage = plainToInstance(DBImage, {
      contentType: req.file?.mimetype,
      data: new Binary(req.file?.buffer),
    });

    switch (req.type) {
      case ImageType.RestaurantLogo:
        return this.restaurantModel.findByIdAndUpdate(req.targetId, { logo: dbImage });
      case ImageType.DishPhoto:
        return this.dishModel.findByIdAndUpdate(req.targetId, { photo: dbImage });
      default:
        return null;
    }
  }

  async exec(req: UploadImageRequest): Promise<UploadImageResponse> {
    if (!req.file) return UploadImageResponse.NoFileGiven;

    const allowedContentType = Object.values(AllowedContentType).includes(req.file.mimetype as AllowedContentType);
    if (!allowedContentType) return UploadImageResponse.FileHasUnknownExtension;

    const targetOwnerId = await this.getTargetOwnerId(req);
    if (req.partnerId !== targetOwnerId) return UploadImageResponse.RequesterIsNotOwner;

    const updatedModel = await this.addToModel(req);
    if (!updatedModel) return UploadImageResponse.ResourceNotFound;

    return UploadImageResponse.Success;
  }
}

export { UploadImageHandler, UploadImageResponse };
export type { UploadImageRequest };
