import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {OwnerService} from './owner/store/owner.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from './app.reducer';
import {OwnerModule} from './owner/owner.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OwnerModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [OwnerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
