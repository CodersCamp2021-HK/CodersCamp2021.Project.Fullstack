import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ArticlesController } from './api';
import { CreateArticleCommandHandler } from './command';
import { GetArticleQueryHandler, GetArticlesQueryHandler } from './query';

const CommandHandlers = [CreateArticleCommandHandler];
const QueryHandlers = [GetArticleQueryHandler, GetArticlesQueryHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ArticlesController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
class ArticlesModule { }

export { ArticlesModule };
