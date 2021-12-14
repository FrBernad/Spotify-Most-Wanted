import {Component, OnInit} from '@angular/core';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {
  faMicrophone as fasMicrophone,
  faMusic as fasMusic,
  faPlay as fasPlay,
  faRecordVinyl as fasRecordVinyl
} from "@fortawesome/free-solid-svg-icons"
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Spotify Most Wanted';

  constructor(
    private titleService: Title,
    private library: FaIconLibrary
  ) {
  }

  ngOnInit(): void {

    this.titleService.setTitle(this.title);

    this.library.addIcons(
      fasMusic, fasMicrophone, fasRecordVinyl, fasPlay
    );

  }
}
