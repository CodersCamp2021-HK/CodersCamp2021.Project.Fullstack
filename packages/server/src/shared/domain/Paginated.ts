interface Paginated<T> {
  readonly data: T[];
  readonly pages: number;
}

interface PaginationQuery {
  readonly page: number;
  readonly limit: number;
}

export type { Paginated, PaginationQuery };
