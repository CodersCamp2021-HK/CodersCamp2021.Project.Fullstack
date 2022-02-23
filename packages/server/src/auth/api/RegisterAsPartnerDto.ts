import { ApiEmailProperty, ApiPasswordProperty } from './decorators';
import { ApiNipProperty } from './decorators/ApiNipProperty';
import { ApiPhoneNumberProperty } from './decorators/ApiPhoneNumberProperty';

class RegisterAsPartnerDto {
  @ApiEmailProperty()
  email: string;

  @ApiPasswordProperty()
  password: string;

  @ApiPhoneNumberProperty()
  phoneNumber: string;

  @ApiNipProperty()
  nip: string;
}

export { RegisterAsPartnerDto };
