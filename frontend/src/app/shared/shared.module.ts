import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
  ]
})
export class SharedModule {
}
