import {Component, Input, OnInit} from '@angular/core';
import {Artist} from "../../models/artist.model";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

   @Input("artist") artist: Artist;

  constructor() { }

  ngOnInit(): void {
  }

}
