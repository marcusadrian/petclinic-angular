import {NgModule} from '@angular/core';

import {OwnerRoutingModule} from './owner-routing.module';
import {OwnerDetailComponent} from './owner-detail/owner-detail.component';
import {OwnerSearchComponent} from './owner-search/owner-search.component';
import {SharedModule} from '../shared/shared.module';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';

@NgModule({
  declarations: [
    OwnerDetailComponent,
    OwnerSearchComponent,
    OwnerEditComponent
  ],
  imports: [
    SharedModule,
    OwnerRoutingModule
  ]
})
export class OwnerModule {
}
