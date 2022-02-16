import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

type ArticleDocument = Article & Document<ObjectId>;

const ARTICLE_CONSTANTS = Object.freeze({
  TITLE: Object.freeze({
    MIN_LENGTH: 4,
    MAX_LENGTH: 256,
  }),
  CONTENT: Object.freeze({
    MIN_LENGTH: 4,
    MAX_LENGTH: 32768,
  }),
});

@Exclude()
@Schema({
  collection: 'articles',
})
class Article {
  @Expose()
  @Prop({
    minlength: ARTICLE_CONSTANTS.TITLE.MIN_LENGTH,
    maxlength: ARTICLE_CONSTANTS.TITLE.MAX_LENGTH,
  })
  title: string;

  @Expose()
  @Prop({
    minlength: ARTICLE_CONSTANTS.CONTENT.MIN_LENGTH,
    maxlength: ARTICLE_CONSTANTS.CONTENT.MAX_LENGTH,
  })
  content: string;

  @Expose()
  readonly id: string;
}

const ArticleSchema = SchemaFactory.createForClass(Article);

export { Article, ARTICLE_CONSTANTS, ArticleSchema };
export type { ArticleDocument };
