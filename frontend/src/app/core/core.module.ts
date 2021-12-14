import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    HttpClientModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule {
}
