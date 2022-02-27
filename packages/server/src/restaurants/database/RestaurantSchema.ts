import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

type RestaurantDocument = Restaurant & Document<ObjectId>;

@Exclude()
@Schema({
  collection: 'restaurants',
})
class Restaurant {
  @Expose()
  readonly id: string;
}

const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

export { Restaurant, RestaurantSchema };
export type { RestaurantDocument };
