import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PaginationComponent} from "./pagination/pagination.component";

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
    CommonModule
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    NavbarComponent,
    FooterComponent,
    PaginationComponent,
    RouterModule
  ]
})
export class SharedModule {
}
