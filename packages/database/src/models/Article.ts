import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type ArticleDocument = Article & Document;

@Schema()
class Article {
  @Prop()
  title: string;

  @Prop()
  content: string;
}

const ArticleSchema = SchemaFactory.createForClass(Article);

export { Article, ArticleSchema };
export type { ArticleDocument };
