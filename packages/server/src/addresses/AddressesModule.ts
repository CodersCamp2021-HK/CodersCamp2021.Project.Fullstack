import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AddressesController } from './api';
import { Address, AddressSchema } from './database';
import { CreateAddressHandler, DeleteAddressHandler, GetAddressHandler, UpdateAddressHandler } from './domain';

@Module({
  imports: [MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }])],
  controllers: [AddressesController],
  providers: [CreateAddressHandler, DeleteAddressHandler, GetAddressHandler, UpdateAddressHandler],
})
class AddressesModule {}

export { AddressesModule };
