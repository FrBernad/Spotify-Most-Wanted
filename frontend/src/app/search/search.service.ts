import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Subject} from "rxjs";
import {PaginationUtils} from "../utils/pagination-utils";
import {Router} from "@angular/router";
import {Album} from "../models/album.model";
import {PaginationResult} from "../models/pagination-result.model";
import {Artist} from "../models/artist.model";
import {Song} from "../models/song.model";
import {Country} from "../models/country.model";

export interface AlbumPaginationQuery {
  artist?: string;
  genre?: string;
  country?: string;
  page: number;
  itemsPerPage?: number;
}

export interface SongPaginationQuery {
  artist?: string;
  genre?: string;
  country?: string;
  page: number;
  itemsPerPage?: number;
}

export interface ArtistPaginationQuery {
  genre?: string;
  country?: string;
  page: number;
  itemsPerPage?: number;
}


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  songs = new Subject<PaginationResult<Song>>();
  albums = new Subject<PaginationResult<Album>>();
  artists = new Subject<PaginationResult<Artist>>();
  countries = new BehaviorSubject<Country[]>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  getSongs(query: SongPaginationQuery) {
    this.http
      .get<Song[]>(
        environment.apiBaseUrl + '/songs',
        {
          observe: "response",
          params: new HttpParams({fromObject: {...query}})
        },
      ).subscribe((res) => {
        if (res.status === HttpStatusCode.NoContent) {
          this.songs.next({
            totalPages: 0,
            results: []
          });
        } else {
          const results: PaginationResult<Song> = PaginationUtils.parsePaginationResult(res);
          this.songs.next(results);
        }
      },
      (error => this.onError(error))
    )
  }

  getAlbums(query: AlbumPaginationQuery) {
    this.http
      .get<Album[]>(
        environment.apiBaseUrl + '/albums',
        {
          observe: "response",
          params: new HttpParams({fromObject: {...query}})
        },
      ).subscribe((res) => {
        if (res.status === HttpStatusCode.NoContent) {
          this.albums.next({
            totalPages: 0,
            results: []
          });
        } else {
          const results: PaginationResult<Album> = PaginationUtils.parsePaginationResult(res);
          this.albums.next(results);
        }
      },
      (error => this.onError(error))
    )
  }

  getArtists(query: AlbumPaginationQuery) {
    this.http
      .get<Artist[]>(
        environment.apiBaseUrl + '/artists',
        {
          observe: "response",
          params: new HttpParams({fromObject: {...query}})
        },
      ).subscribe((res) => {
        if (res.status === HttpStatusCode.NoContent) {
          this.artists.next({
            totalPages: 0,
            results: []
          });
        } else {
          const results: PaginationResult<Artist> = PaginationUtils.parsePaginationResult(res);
          this.artists.next(results);
        }
      },
      (error => this.onError(error))
    )
  }


  getCountries() {
    if (!this.countries.getValue()) {
      this.http
        .get<Country[]>(
          environment.apiBaseUrl + '/countries',
        ).subscribe((res) => {
          this.countries.next(res);
        },
        (error => this.onError(error))
      )
    }
  }

  private onError(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.NotFound) {
      this.router.navigate(['404']);
    } else {
      this.router.navigate(['500']);
    }
  }

}
