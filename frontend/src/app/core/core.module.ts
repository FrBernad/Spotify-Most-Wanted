import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {APP_BASE_HREF} from "@angular/common";
import {environment} from "../../environments/environment";

@NgModule({
  declarations: [],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: environment.baseHref
    }
  ],
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
