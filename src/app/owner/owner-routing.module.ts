import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OwnerSearchComponent} from './owner-search/owner-search.component';
import {OwnerDetailComponent} from './owner-detail/owner-detail.component';

const routes: Routes = [
  {
    path: 'owners', children: [
      {path: 'search', component: OwnerSearchComponent},
      {path: ':id', component: OwnerDetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule {
}
