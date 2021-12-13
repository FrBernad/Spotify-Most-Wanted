import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationResult} from "../models/pagination-result.model";
import {Song} from "../models/song.model";
import {SongPaginationQuery, SongsService} from "./songs.service";
import {PaginationUtils} from "../utils/pagination-utils";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit, OnDestroy {

  response: PaginationResult<Song> = {
    results: [],
    totalPages: 0,
  }

  query: SongPaginationQuery = {
    page: PaginationUtils.DEFAULT_ITEMS_PER_PAGE,
    itemsPerPage: PaginationUtils.DEFAULT_ITEMS_PER_PAGE
  }

  selectedCountry: string = "";
  selectedGenre: string = "";

  loading = true;

  private songsSub: Subscription | undefined;

  constructor(
    private songsService: SongsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((e) => {
      this.parseQueryParams();
      this.songsService.getSongs(this.query);
    })

    this.songsSub = this.songsService.results.subscribe(
      (results) => {
        this.response = {
          ...this.response,
          ...results
        };
        this.loading = false;
      });
  }

  onChangeCountry(country: string, id: string) {
    this.selectedCountry = country;
    this.query.country = country;
    this.query.page = 0;
    if (!id) {
      delete this.query.country;
    }
    this.updateRoute(false);
  }

  onChangeGenre(genre: string, id: string) {
    this.selectedGenre = genre;
    this.query.genre = genre;
    this.query.page = 0;
    if (!id) {
      delete this.query.genre;
    }
    this.updateRoute(false);
  }

  onChangePage(page: number) {
    this.query.page = page;
    this.updateRoute(false);
  }

  onSearchEnter(e: KeyboardEvent, query: string) {
    if (e.key === "Enter") {
      this.onSearch(query);
    }
  }

  onSearch(query: string) {
    this.query.page = 0;
    this.updateRoute(false);
  }

  private updateRoute(replace: boolean) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {...this.query},
        replaceUrl: replace
      });
  }

  private parseQueryParams() {
    const params = this.route.snapshot.queryParams;

    this.query = {
      ...this.query,
      ...params
    }

    if (params["page"]) {
      this.query.page = Number.parseInt(params["page"])
      this.query.page = isNaN(this.query.page) ? 0 : this.query.page;
    } else {
      this.query.page = 0;
    }

    if (params["itemsPerPage"]) {
      this.query.itemsPerPage = Number.parseInt(params["itemsPerPage"])
      this.query.itemsPerPage = isNaN(this.query.itemsPerPage) ? 6 : this.query.itemsPerPage;
    } else {
      this.query.itemsPerPage = 6
    }

    if (!params["country"]) {
      delete this.query.country;
    }

    if (!params["artist"]) {
      delete this.query.artist;
    }

    if (!params["genre"]) {
      delete this.query.genre;
    }

  }

  ngOnDestroy(): void {
    if (!!this.songsSub) {
      this.songsSub.unsubscribe();
    }
  }

}
