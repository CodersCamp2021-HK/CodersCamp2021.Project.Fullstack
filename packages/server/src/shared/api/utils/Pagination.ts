import { URLSearchParams } from 'url';

function createPaginationLink(url: URL, pages: number) {
  const search = new URLSearchParams(url.searchParams);
  const page = parseInt(search.get('page') ?? '1', 10);
  const createLink = (rel: string) => `<${url.origin}${url.pathname}?${search.toString()}>; rel="${rel}",`;
  search.set('page', '1');
  const firstLink = createLink('first');
  search.set('page', pages.toString());
  const lastLink = createLink('last');
  search.set('page', `${page - 1}`);
  const prevLink = page === 1 ? `` : createLink('prev');
  search.set('page', `${page + 1}`);
  const nextLink = page === pages ? `` : createLink('next');
  return `${firstLink}${prevLink}${nextLink}${lastLink}`;
}

export { createPaginationLink };
