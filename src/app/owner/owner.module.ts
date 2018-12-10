import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OwnerRoutingModule} from './owner-routing.module';
import {OwnerDetailComponent} from './owner-detail/owner-detail.component';
import {OwnerSearchComponent} from './owner-search/owner-search.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    OwnerDetailComponent,
    OwnerSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OwnerRoutingModule
  ]
})
export class OwnerModule {
}
