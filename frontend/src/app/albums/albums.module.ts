import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {AlbumsComponent} from "./albums.component";
import { AlbumComponent } from './album/album.component';

@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    AlbumsComponent
  ]
})
export class AlbumsModule {
}
