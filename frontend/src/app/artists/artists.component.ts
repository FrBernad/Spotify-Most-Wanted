import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationResult} from "../models/pagination-result.model";
import {Artist} from "../models/artist.model";
import {PaginationUtils} from "../utils/pagination-utils";
import {Subscription} from "rxjs";
import {ArtistPaginationQuery, SearchService} from "../search/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {Country} from "../models/country.model";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {


  constructor(
    private searchService: SearchService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {

  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  currentTab(tab: string): Boolean {
    return this.router.url.split('?')[0] === tab;
  }

}
