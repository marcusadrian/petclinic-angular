import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OwnerSearchComponent} from './owner-search/owner-search.component';
import {OwnerDetailComponent} from './owner-detail/owner-detail.component';
import {OwnerEditComponent} from './owner-edit/owner-edit.component';
import {PetEditComponent} from './pet/pet-edit/pet-edit.component';

const routes: Routes = [
  {
    path: 'owners', children: [
      {path: 'search', component: OwnerSearchComponent},
      {path: 'new', component: OwnerEditComponent},
      {path: ':ownerId', component: OwnerDetailComponent},
      {path: ':ownerId/edit', component: OwnerEditComponent},
      {path: ':ownerId/pets/new', component: PetEditComponent},
      {path: ':ownerId/pets/:petId/edit', component: PetEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule {
}
