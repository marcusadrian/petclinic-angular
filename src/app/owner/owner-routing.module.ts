import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OwnerSearchComponent} from './owner-search/owner-search.component';
import {OwnerDetailComponent} from './owner-detail/owner-detail.component';
import {OwnerEditComponent} from './owner-edit/owner-edit.component';

const routes: Routes = [
  {
    path: 'owners', children: [
      {path: 'search', component: OwnerSearchComponent},
      {path: 'new', component: OwnerEditComponent},
      {path: ':id', component: OwnerDetailComponent},
      {path: ':id/edit', component: OwnerEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule {
}
