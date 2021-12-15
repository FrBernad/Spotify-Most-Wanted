import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationResult} from "../models/pagination-result.model";
import {Album} from "../models/album.model";
import {AlbumPaginationQuery, SearchService} from "../search/search.service";
import {PaginationUtils} from "../utils/pagination-utils";
import {Country} from "../models/country.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {

  response: PaginationResult<Album> = {
    results: [],
    totalPages: 0,
  }

  query: AlbumPaginationQuery = {
    page: PaginationUtils.DEFAULT_ITEMS_PER_PAGE,
    itemsPerPage: PaginationUtils.DEFAULT_ITEMS_PER_PAGE
  }

  countries: Country[] = [];

  selectedCountry: string = "Any";
  selectedGenre: string = "Any";
  selectedArtist: string = "Any";

  loading = true;

  private albumsSub: Subscription;
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

    this.route.queryParams.subscribe((_) => {
      this.parseQueryParams();
      this.loading = true;
      this.spinner.show();
      this.searchService.getAlbums(this.query);
    })

    this.searchService.getCountries();

    this.countriesSub = this.searchService.countries.subscribe(
      results => {
        if (!!results) {
          this.countries = results;
        }
      }
    )

    this.albumsSub = this.searchService.albums.subscribe(
      (results) => {
        this.response = {
          ...this.response,
          ...results
        };
        if (this.loading) {
          this.spinner.hide().then(() => this.loading = false);
        }
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

    this.query.genre = this.selectedGenre;
    this.query.artist = this.selectedArtist;

    if (this.selectedGenre == "Any") {
      delete this.query.genre;
    }

    if (this.selectedArtist == "Any") {
      delete this.query.artist;
    }

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
      this.query.page = isNaN(this.query.page) ? PaginationUtils.DEFAULT_PAGE : this.query.page;
    } else {
      this.query.page = PaginationUtils.DEFAULT_PAGE;
    }

    if (params["itemsPerPage"]) {
      this.query.itemsPerPage = Number.parseInt(params["itemsPerPage"])
      this.query.itemsPerPage = isNaN(this.query.itemsPerPage) ? PaginationUtils.DEFAULT_ITEMS_PER_PAGE : this.query.itemsPerPage;
    } else {
      this.query.itemsPerPage = PaginationUtils.DEFAULT_ITEMS_PER_PAGE
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
    if (!!this.albumsSub) {
      this.albumsSub.unsubscribe();
    }
    if (!!this.countriesSub) {
      this.countriesSub.unsubscribe();
    }
  }

}
