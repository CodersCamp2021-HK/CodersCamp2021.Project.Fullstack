import { ApiProperty } from '@nestjs/swagger';

class CreateArticleDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly content: string;
}

export { CreateArticleDto };
