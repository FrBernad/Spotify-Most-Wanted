import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ArtistsComponent} from "./artists.component";
import {ArtistComponent} from './artist/artist.component';
import {PopularityComponent} from './popularity/popularity.component';
import {ArtistsRoutingModule} from "./artists-routing.module";
import {RelationsComponent} from "./relations/relations.component";

@NgModule({
  declarations: [
    ArtistsComponent,
    ArtistComponent,
    PopularityComponent,
    RelationsComponent
  ],
  imports: [
    SharedModule,
    ArtistsRoutingModule
  ],
  exports: [
    ArtistsComponent
  ]
})
export class ArtistsModule {
}
