import {NgModule} from "@angular/core";
import {LandingPageComponent} from "./landing-page.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule {
}
