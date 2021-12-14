import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

  code: number = 404;
  message: string = "";

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.data["code"];

    switch (this.code) {
      case 404:
        this.message = "Error 404 - Not Found";
        break;
      default:
        this.message = "Error 500 - Server Error";
    }

  }

}
