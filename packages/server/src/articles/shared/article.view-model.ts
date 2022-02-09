import { ArticleDocument } from '@fullstack/database';

class ArticleViewModel {
  constructor(public readonly id: string, public readonly title: string, public readonly content: string) {}

  static from(doc: ArticleDocument) {
    return new ArticleViewModel(doc._id.toString(), doc.title, doc.content);
  }
}

export { ArticleViewModel };
