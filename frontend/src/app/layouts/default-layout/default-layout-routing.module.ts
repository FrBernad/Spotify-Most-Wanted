import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DefaultLayoutComponent} from "./default-layout.component";
import {LandingPageComponent} from "../../landing-page/landing-page.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent,
        loadChildren: () => import("../../landing-page/landing-page.module").then(m => m.LandingPageModule)
      },
      // {
      //   path: '404',
      //   loadChildren: () => import("../../errors/errors.module").then(m => m.ErrorsModule),
      //   data: {
      //     i18: 'pageNotFound',
      //     code: 404,
      //   }
      // },
      // {
      //   path: '500',
      //   loadChildren: () => import("../../errors/errors.module").then(m => m.ErrorsModule),
      //   data: {
      //     i18: 'serverError',
      //     code: 500,
      //   }
      // },
      // {
      //   path: '**',
      //   loadChildren: () => import("../../errors/errors.module").then(m => m.ErrorsModule),
      //   data: {
      //     i18: 'pageNotFound',
      //     code: 404,
      //   }
      // }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultLayoutRoutingModule {
}
