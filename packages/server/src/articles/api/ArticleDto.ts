import { ApiProperty, OmitType } from '@nestjs/swagger';

import { ApiObjectIdProperty } from '../../shared';
import { ARTICLE_CONSTANTS } from '../database';

class ArticleDto {
  @ApiObjectIdProperty()
  readonly id: string;

  @ApiProperty({
    minLength: ARTICLE_CONSTANTS.TITLE.MIN_LENGTH,
    maxLength: ARTICLE_CONSTANTS.TITLE.MAX_LENGTH,
  })
  readonly title: string;

  @ApiProperty({
    minLength: ARTICLE_CONSTANTS.CONTENT.MIN_LENGTH,
    maxLength: ARTICLE_CONSTANTS.CONTENT.MAX_LENGTH,
  })
  readonly content: string;
}

class CreateArticleDto extends OmitType(ArticleDto, ['id'] as const) {}

class UpdateArticleDto extends CreateArticleDto {}

export { ArticleDto, CreateArticleDto, UpdateArticleDto };
