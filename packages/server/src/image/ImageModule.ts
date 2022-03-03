import { Module } from '@nestjs/common';

import { ImageController } from './api';
import { GetImageHandler } from './domain/GetImageHandler';

@Module({
  controllers: [ImageController],
  providers: [GetImageHandler],
})
class ImageModule {}

export { ImageModule };
