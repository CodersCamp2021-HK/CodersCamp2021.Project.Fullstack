import { HttpStatus } from '@nestjs/common';

import { CreateArticleDto } from '../src/articles/api/ArticleDto';
import { initE2eFixture } from './E2eFixture';

const PATH = '/api/articles';

describe(`${PATH}`, () => {
  const fixture = initE2eFixture();

  afterEach(async () => {
    await fixture.db.articleModel.deleteMany();
  });

  it('POST /', async () => {
    // Given
    const reqBody: CreateArticleDto = { title: 'sample', content: 'sample' };

    // When
    const resp = await fixture.req.post(PATH).send(reqBody);
    // Then
    expect(resp.status).toBe(HttpStatus.CREATED);
    expect(resp.body).toEqual(expect.objectContaining(reqBody));
  });

  it('GET /:id', async () => {
    // Given
    const article = { title: 'sample', content: 'sample' };
    const created = await fixture.db.articleModel.create(article);
    const id = created._id.toString();

    // When
    const resp = await fixture.req.get(`${PATH}/${id}`);

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(created).toEqual(expect.objectContaining(resp.body));
  });

  it('GET /', async () => {
    // Given
    const articles = [
      { title: 'sample', content: 'sample' },
      { title: 'sample', content: 'sample' },
    ];
    await fixture.db.articleModel.create(articles);

    // When
    const resp = await fixture.req.get(PATH);

    // Then
    expect(resp.status).toBe(HttpStatus.OK);
    expect(resp.body.data).toHaveLength(articles.length);
  });
});
