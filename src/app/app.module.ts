import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {HomeComponent} from './home/home.component';
import {OwnerDetailComponent} from './owner/owner-detail/owner-detail.component';
import {OwnerSearchComponent} from './owner/owner-search/owner-search.component';
import {OwnerService} from './owner/store/owner.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from './app.reducer';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OwnerDetailComponent,
    OwnerSearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [OwnerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
