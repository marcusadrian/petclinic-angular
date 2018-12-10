import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OwnerRoutingModule} from './owner-routing.module';
import {OwnerDetailComponent} from './owner-detail/owner-detail.component';
import {OwnerSearchComponent} from './owner-search/owner-search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    OwnerDetailComponent,
    OwnerSearchComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class OwnerModule {
}
