import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Restaurant, RestaurantSchema } from '../restaurants/database';
import { User, UserSchema } from '../users/database';
import { PartnerAddressController, UserAddressController } from './api';
import { Address, AddressSchema } from './database';
import { CreateAddressHandler, GetAddressHandler } from './domain';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserAddressController, PartnerAddressController],
  providers: [CreateAddressHandler, GetAddressHandler],
})
class AddressesModule {}

export { AddressesModule };
