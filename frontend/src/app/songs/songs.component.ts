import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationResult} from "../models/pagination-result.model";
import {Song} from "../models/song.model";
import {PaginationUtils} from "../utils/pagination-utils";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {SearchService, SongPaginationQuery} from "../search/search.service";
import {Country} from "../models/country.model";

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

  countries: Country[] = [];

  selectedCountry: string = "Any";
  selectedGenre: string = "";
  selectedArtist: string = "";

  loading = true;

  private songsSub: Subscription;
  private countriesSub: Subscription;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {

    this.spinner.show();

    this.route.queryParams.subscribe((e) => {
      this.parseQueryParams();
      this.searchService.getSongs(this.query);
    })

    this.searchService.getCountries();

    this.countriesSub = this.searchService.countries.subscribe(
      results => {
        if (!!results) {
          this.countries = results;
        }
      }
    )

    this.songsSub = this.searchService.songs.subscribe(
      (results) => {
        this.response = {
          ...this.response,
          ...results
        };
        this.spinner.hide().then(() => this.loading = false);
      });
  }

  onChangeCountry(country: string) {
    this.selectedCountry = country;
    this.query.country = country;
    if (!country) {
      this.selectedCountry = "Any";
      delete this.query.country;
    }
  }

  onChangeGenre(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.onSearch();
    }
  }

  onChangeArtist(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.onSearch();
    }
  }

  onSearch() {
    this.query.page = 0;
    this.query.artist = this.selectedArtist;
    this.query.country = this.selectedCountry;
    this.query.genre = this.selectedGenre;
    this.updateRoute();
  }

  onChangePage(page: number) {
    this.query.page = page;
    this.updateRoute();
  }

  private updateRoute() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {...this.query},
        replaceUrl: false
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
    if (!!this.countriesSub) {
      this.countriesSub.unsubscribe();
    }
  }

}
