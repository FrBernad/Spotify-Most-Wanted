import {HttpResponse} from "@angular/common/http";
import {PaginationResult} from "../models/pagination-result.model";

export class PaginationUtils {

  static DEFAULT_ITEMS_PER_PAGE = 6;
  static DEFAULT_PAGE = 0;

  static parsePaginationResult<T>(res: HttpResponse<T[]>): PaginationResult<T> {

    if (!res || !res.body) {
      throw new Error("invalid response");
    }

    // @ts-ignore
    const lastLink: string = res.headers
      .getAll('Link')
      .pop()
      .split(',')
      .filter((link) => (link.includes("last")))
      .pop()
      .match(/<(.*)>/)[1];

    const totalPages: number = Number(new URL(lastLink).searchParams.get("page")) + 1;

    return new PaginationResult<T>(totalPages, res.body);
  }
}
