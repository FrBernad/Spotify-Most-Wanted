import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as url from "url";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  isCurrentRoute(route: String): Boolean {
    return this.router.url.split('?')[0]  === route;
  }

}
