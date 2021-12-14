import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PopularityComponent} from "./popularity/popularity.component";
import {ArtistsComponent} from "./artists.component";
import {RelationsComponent} from "./relations/relations.component";

const routes: Routes = [
    {
      path: '',
      component: ArtistsComponent,
      children: [
        {
          path: '',
          redirectTo: 'popularity'
        },
        {
          path: 'popularity',
          component: PopularityComponent
        },
        {
          path: 'relations',
          component: RelationsComponent
        }
      ]
    },

  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistsRoutingModule {
}
