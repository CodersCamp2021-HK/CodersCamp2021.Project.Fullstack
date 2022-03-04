import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Restaurant, RestaurantSchema } from '../restaurants/database';
import { Dish, DishSchema } from '../restaurants/dishes/database';
import { ImageController } from './api';
import { GetImageHandler } from './domain/GetImageHandler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }]),
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
  ],
  controllers: [ImageController],
  providers: [GetImageHandler],
})
class ImageModule {}

export { ImageModule };
