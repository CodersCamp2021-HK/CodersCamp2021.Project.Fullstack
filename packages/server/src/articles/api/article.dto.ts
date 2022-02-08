import { ApiProperty } from "@nestjs/swagger";
import { CreateArticleDto } from "./create-article.dto";

class ArticleDto extends CreateArticleDto {

  @ApiProperty()
  readonly id: string;
  
}

export { ArticleDto };