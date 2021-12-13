import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserModule} from "@angular/platform-browser";
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
