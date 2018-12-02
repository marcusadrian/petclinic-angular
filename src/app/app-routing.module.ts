import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OwnerSearchComponent} from './owner/owner-search/owner-search.component';
import {OwnerDetailComponent} from './owner/owner-detail/owner-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'owners', children: [
      {path: 'search', component: OwnerSearchComponent},
      {path: ':id', component: OwnerDetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
