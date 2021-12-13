import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PaginationComponent} from "./pagination/pagination.component";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    PaginationComponent
  ],
  imports: [
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    NavbarComponent,
    FooterComponent,
    PaginationComponent,
    NgxSpinnerModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule {
}
