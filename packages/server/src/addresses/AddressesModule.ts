import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PartnerAddressController, UserAddressController } from './api';
import { Address, AddressSchema } from './database';
import { CreateAddressHandler, GetAddressHandler } from './domain';

@Module({
  imports: [MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }])],
  controllers: [UserAddressController, PartnerAddressController],
  providers: [CreateAddressHandler, GetAddressHandler],
})
class AddressesModule {}

export { AddressesModule };
