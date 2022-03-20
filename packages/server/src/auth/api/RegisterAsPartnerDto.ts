import { ApiEmailProperty, ApiPasswordProperty } from './decorators';
import { ApiNipProperty } from './decorators/ApiNipProperty';
import { ApiPhoneNumberProperty } from './decorators/ApiPhoneNumberProperty';

class RegisterAsPartnerDto {
  @ApiEmailProperty({ example: 'partner@email.com' })
  readonly email: string;

  @ApiPasswordProperty()
  readonly password: string;

  @ApiPhoneNumberProperty()
  readonly phoneNumber: string;

  @ApiNipProperty()
  readonly nip: string;
}

export { RegisterAsPartnerDto };
