import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import * as UI from './ui.actions';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private ongoingRequestCount = 0;

  constructor(private store: Store<AppState>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.ongoingRequestCount === 0) {
      // start spinner
      this.store.dispatch(new UI.StartLoading());
    }
    this.ongoingRequestCount++;
    return next.handle(request).pipe(
      finalize(() => {
        this.ongoingRequestCount--;
        if (this.ongoingRequestCount === 0) {
          // stop spinner
          this.store.dispatch(new UI.StopLoading());
        }
      })
    );
  }
}
