import {NgModule} from "@angular/core";
import {LandingPageComponent} from "./landing-page.component";
import {SharedModule} from "../shared/shared.module";
import {NgParticlesModule} from "ng-particles";

@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    NgParticlesModule,
    SharedModule,
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule {
}
