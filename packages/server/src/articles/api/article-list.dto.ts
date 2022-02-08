import { ApiProperty } from "@nestjs/swagger";
import { ArticleDto } from "./article.dto";

class ArticleListDto {

  @ApiProperty({ type: [ArticleDto] })
  data: ArticleDto[];

}

export { ArticleListDto };
