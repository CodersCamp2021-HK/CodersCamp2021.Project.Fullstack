import { Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ApiAuthorization, ApiController, ApiGet, ApiUpdate, PartnerId, Role } from '../../../shared';
import { GetRestaurantHandler } from '../../domain/GetRestaurantHandler';
import { PartnerProfileDto, UpdatePartnerProfileDto } from './PartnerProfileDto';

@ApiController({ path: 'partner/profile', name: "Partner's profile", description: "Operations on partner's profile" })
class PartnerProfileController {
  constructor(private readonly getRestaurantHandler: GetRestaurantHandler) {}

  @ApiGet({ path: '', name: 'profile', response: PartnerProfileDto })
  @ApiAuthorization(Role.Partner)
  async findById(@PartnerId() partnerId: string) {
    const partner = await this.getRestaurantHandler.exec({ id: partnerId, profileMustBeCompleted: false });
    if (!partner) return null;
    return plainToInstance(PartnerProfileDto, partner);
  }

  @ApiUpdate({ path: '', name: 'profile' })
  @ApiAuthorization(Role.Partner)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(@PartnerId() partnerId: string, @Body() updatePartnerProfileDto: UpdatePartnerProfileDto) {
    return null; // TODO: Hook up UpdatePartnerProfileHandler (issue #22), remove eslint-disable comment above
  }
}

export { PartnerProfileController };
