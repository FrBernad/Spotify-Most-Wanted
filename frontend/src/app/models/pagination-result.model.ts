export class PaginationResult<T> {
  constructor(
    public totalPages: number,
    public results: T[]
  ) {
  }
}
