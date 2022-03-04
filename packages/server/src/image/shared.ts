import { Binary } from 'mongodb';

enum ImageType {
  RestaurantLogo = 'restaurant',
  DishPhoto = 'dish',
}

enum ContentType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  WEBP = 'image/webp',
}

class DBImage {
  readonly data: Binary;
  readonly contentType: ContentType;
}

export { ContentType, DBImage, ImageType };
