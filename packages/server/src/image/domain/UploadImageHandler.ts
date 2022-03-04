import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Binary } from 'mongodb';
import { Model } from 'mongoose';

import { Restaurant, RestaurantDocument } from '../../restaurants/database';
import { Dish, DishDocument } from '../../restaurants/dishes/database';
import { Handler } from '../../shared';
import { ContentType, DBImage, ImageType } from '../shared';

interface UploadImageRequest {
  readonly partnerId: string;
  readonly targetId: string;
  readonly type: ImageType;
  readonly file?: Express.Multer.File;
}

class UploadImageHandler implements Handler<UploadImageRequest, boolean> {
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

  async exec(req: UploadImageRequest): Promise<boolean> {
    const contentTypeIsAllowed = Object.values(ContentType).includes(req.file?.mimetype as ContentType);
    const targetOwner = await this.getTargetOwnerId(req);
    if (!req.file || !contentTypeIsAllowed || req.partnerId !== targetOwner) return false;
    const updatedModel = await this.addToModel(req);
    return updatedModel !== null;
  }
}

export { UploadImageHandler };
