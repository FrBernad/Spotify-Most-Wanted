import {Component, Input, OnInit} from '@angular/core';
import {Song} from "../../models/song.model";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  @Input("song") song: Song;

  showBtn = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  getDate(){
    return new Date(this.song.release_date);
  }

}
