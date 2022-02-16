import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ArticleDto } from './ArticleDto';

class ArticleListDto {
  @Type(() => ArticleDto)
  @ApiProperty({ type: [ArticleDto] })
  data: ArticleDto[];

  @ApiProperty()
  pages: number;
}

export { ArticleListDto };
