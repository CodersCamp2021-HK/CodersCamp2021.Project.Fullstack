import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

type ArticleDocument = Article & Document<ObjectId>;

@Exclude()
@Schema()
class Article {
  @Expose()
  @Prop()
  title: string;

  @Expose()
  @Prop()
  content: string;

  @Expose()
  readonly id: string;
}

const ArticleSchema = SchemaFactory.createForClass(Article);

export { Article, ArticleSchema };
export type { ArticleDocument };
