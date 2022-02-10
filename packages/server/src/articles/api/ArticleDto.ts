import { ApiProperty, OmitType } from '@nestjs/swagger';

class ArticleDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly content: string;
}

class CreateArticleDto extends OmitType(ArticleDto, ['id'] as const) {}

export { ArticleDto, CreateArticleDto };
