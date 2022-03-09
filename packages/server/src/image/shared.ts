import { Binary } from 'mongodb';

enum ImageType {
  RestaurantLogo = 'restaurant',
  DishPhoto = 'dish',
}

enum AllowedContentType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  WEBP = 'image/webp',
}

class DBImage {
  readonly data: Binary;
  readonly contentType: AllowedContentType;
}

export { AllowedContentType, DBImage, ImageType };
