import { Article, ArticleDocument } from "@fullstack/database";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ArticleViewModel } from "../shared";

class CreateArticleCommand {
  constructor(public readonly title: string, public readonly content: string) {}
}

@CommandHandler(CreateArticleCommand)
class CreateArticleCommandHandler implements ICommandHandler<CreateArticleCommand, ArticleViewModel> {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {
  }

  async execute(command: CreateArticleCommand): Promise<ArticleViewModel> {
    const created = await this.articleModel.create({ ...command });
    return ArticleViewModel.from(created);
  }
}

export { CreateArticleCommandHandler, CreateArticleCommand };