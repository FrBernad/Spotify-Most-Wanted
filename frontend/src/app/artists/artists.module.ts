import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {NgParticlesModule} from "ng-particles";
import {ArtistsComponent} from "./artists.component";

@NgModule({
  declarations: [
    ArtistsComponent,
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
