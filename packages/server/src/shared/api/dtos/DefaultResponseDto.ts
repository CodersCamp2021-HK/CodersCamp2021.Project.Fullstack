import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class DefaultResponseDto {
  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  status: string;

  @Expose()
  @ApiProperty()
  path: string;

  @Expose()
  @ApiProperty({ required: false })
  message?: string;
}

export { DefaultResponseDto };
