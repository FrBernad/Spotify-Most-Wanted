import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DefaultLayoutComponent} from "./default-layout.component";
import {LandingPageComponent} from "../../landing-page/landing-page.component";
import {SongsComponent} from "../../songs/songs.component";
import {AlbumsComponent} from "../../albums/albums.component";
import {ArtistsComponent} from "../../artists/artists.component";
import {ErrorsComponent} from "../../errors/errors.component";

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
      {
        path: 'songs',
        component: SongsComponent,
        loadChildren: () => import("../../songs/songs.module").then(m => m.SongsModule)
      },
      {
        path: 'artists',
        component: ArtistsComponent,
        loadChildren: () => import("../../artists/artists.module").then(m => m.ArtistsModule)
      },
      {
        path: 'albums',
        component: AlbumsComponent,
        loadChildren: () => import("../../albums/albums.module").then(m => m.AlbumsModule)
      },
      {
        path: '404',
        component: ErrorsComponent,
        loadChildren: () => import("../../errors/errors.module").then(m => m.ErrorsModule),
        data: {
          code: 404,
        }
      },
      {
        path: '500',
        component: ErrorsComponent,
        loadChildren: () => import("../../errors/errors.module").then(m => m.ErrorsModule),
        data: {
          code: 500,
        }
      },
      {
        path: '**',
        component: ErrorsComponent,
        loadChildren: () => import("../../errors/errors.module").then(m => m.ErrorsModule),
        data: {
          code: 404,
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultLayoutRoutingModule {
}
