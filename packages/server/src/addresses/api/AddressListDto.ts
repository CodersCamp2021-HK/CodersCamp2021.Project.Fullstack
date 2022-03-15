import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { AddressDto } from './AddressDto';

class AddressListDto {
  @Type(() => AddressDto)
  @ApiProperty({ type: [AddressDto] })
  data: AddressDto[];

  @ApiProperty()
  pages: number;
}

export { AddressListDto };
