import { Body, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Express } from 'express';

import { ApiAuthorization, ApiController, ApiGet, ApiUpdate, PartnerId, Role } from '../../../shared';
import { GetRestaurantHandler } from '../../domain/GetRestaurantHandler';
import { UpdatePartnerProfileHandler } from '../domain/UpdatePartnerProfileHandler';
import { PartnerProfileDto, UpdatePartnerProfileDto } from './PartnerProfileDto';

@ApiController({ path: 'partner/profile', name: "Partner's profile", description: "Operations on partner's profile" })
@ApiTags('files')
class PartnerProfileController {
  constructor(
    private readonly getRestaurantHandler: GetRestaurantHandler,
    private readonly updatePartnerProfileHandler: UpdatePartnerProfileHandler,
  ) {}

  @ApiGet({ path: '', name: 'profile', response: PartnerProfileDto })
  @ApiAuthorization(Role.Partner)
  async findById(@PartnerId() partnerId: string) {
    const partner = await this.getRestaurantHandler.exec({ id: partnerId, profileMustBeCompleted: false });
    if (!partner) return null;
    return plainToInstance(PartnerProfileDto, partner);
  }

  // @ApiUpdate({ path: '', name: 'logo' })
  // @ApiAuthorization(Role.Partner)
  // @UseInterceptors(FileInterceptor('logo'))
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       logo: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }

  @ApiUpdate({ path: '', name: 'profile' })
  @ApiAuthorization(Role.Partner)
  async update(@PartnerId() partnerId: string, @Body() updatePartnerProfileDto: UpdatePartnerProfileDto) {
    return this.updatePartnerProfileHandler.exec({ id: partnerId, ...updatePartnerProfileDto });
  }
}

export { PartnerProfileController };
