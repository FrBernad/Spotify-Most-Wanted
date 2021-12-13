import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Song} from "../models/song.model";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";
import {PaginationUtils} from "../utils/pagination-utils";
import {Router} from "@angular/router";
import {PaginationResult} from "../models/pagination-result.model";

export interface SongPaginationQuery {
  artist?: string;
  genre?: string;
  country?: string;
  page: number;
  itemsPerPage?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  results = new Subject<PaginationResult<Song>>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  getSongs(query: SongPaginationQuery) {
    return this.http
      .get<Song[]>(
        environment.apiBaseUrl + '/songs',
        {
          observe: "response",
          params: new HttpParams({fromObject: {...query}})
        },
      ).subscribe((res) => {
          if (res.status === HttpStatusCode.NoContent) {
            this.results.next({
              totalPages: 0,
              results: []
            });
          } else {
            const result: PaginationResult<Song> = PaginationUtils.parsePaginationResult(res);
            this.results.next(result);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.NotFound) {
            this.router.navigate(['404']);
          } else {
            this.router.navigate(['500']);
          }
        }
      )
  }
}
