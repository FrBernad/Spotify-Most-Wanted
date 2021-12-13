import {ErrorsComponent} from "./errors.component";
import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [
    ErrorsComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ErrorsComponent,
  ]
})
export class ErrorsModule {
}
