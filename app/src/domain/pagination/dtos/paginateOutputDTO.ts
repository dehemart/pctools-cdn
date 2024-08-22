class Meta {
  lastPage: number;
  currentPage: number;
  perPage: number;
}

export class PaginatedOutputDto<T> {
  data: T[];
  meta: Meta[];
}