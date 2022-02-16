import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { DefaultResponseDto } from './DefaultResponseDto';

@Exclude()
class ErrorDetailsDto {
  @Expose()
  @ApiProperty()
  path: string;

  @Expose()
  @ApiProperty()
  message: string;

  @Expose()
  @ApiProperty()
  errorCode: string;
}

@Exclude()
class ValidationErrorDto extends DefaultResponseDto {
  @Expose()
  @Type(() => ErrorDetailsDto)
  @ApiProperty({ type: [ErrorDetailsDto], required: false })
  errors?: ErrorDetailsDto[];
}

export { ValidationErrorDto };
