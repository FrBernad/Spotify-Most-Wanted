import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {SongsComponent} from "./songs.component";
import { SongComponent } from './song/song.component';

@NgModule({
  declarations: [
    SongsComponent,
    SongComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SongsComponent
  ]
})
export class SongsModule {
}
