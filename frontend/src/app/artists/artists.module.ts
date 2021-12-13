import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {NgParticlesModule} from "ng-particles";
import {ArtistsComponent} from "./artists.component";
import { ArtistComponent } from './artist/artist.component';

@NgModule({
  declarations: [
    ArtistsComponent,
    ArtistComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ArtistsComponent
  ]
})
export class ArtistsModule {
}
