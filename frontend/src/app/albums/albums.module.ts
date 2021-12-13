import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {NgParticlesModule} from "ng-particles";
import {AlbumsComponent} from "./albums.component";

@NgModule({
  declarations: [
    AlbumsComponent,
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
