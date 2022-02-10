import { ApiProperty } from '@nestjs/swagger';

import { ArticleDto } from './ArticleDto';

class ArticleListDto {
  @ApiProperty({ type: [ArticleDto] })
  data: ArticleDto[];
}

export { ArticleListDto };
