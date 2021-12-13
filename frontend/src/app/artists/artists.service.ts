import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";
import {PaginationUtils} from "../utils/pagination-utils";
import {Router} from "@angular/router";
import {Album} from "../models/album.model";
import {PaginationResult} from "../models/pagination-result.model";

export interface AlbumPaginationQuery {
  artist?: string;
  genre?: string;
  country?: string;
  page: number;
  itemsPerPage?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  results = new Subject<PaginationResult<Album>>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  getArtists(query: AlbumPaginationQuery) {
    return this.http
      .get<Album[]>(
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
            const result: PaginationResult<Album> = PaginationUtils.parsePaginationResult(res);
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
