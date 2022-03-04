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
  readonly buffer: Buffer;
  readonly contentType: ContentType;
}

export { DBImage, ImageType };
