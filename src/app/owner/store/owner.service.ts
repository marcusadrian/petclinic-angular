import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {OwnerSearchResponse} from '../model/OwnerSearchResponse';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import * as Owner from '../../owner/store/owner.actions';
import {OwnerSummary} from '../model/OwnerSummary';

@Injectable()
export class OwnerService {

  constructor(private httpClient: HttpClient,
              private store: Store<AppState>) {
  }

  fetchOwners(lastName: string) {

    console.log(lastName);
    this.store.dispatch(new UI.StartLoading());
    this.httpClient.get<OwnerSearchResponse>('http://localhost:8080/my-petclinic/owners/search?lastName=' + lastName)
      .pipe(
        map(resp => resp._embedded),
        map(_embedded => _embedded.owners))
      .subscribe((owners: OwnerSummary[]) => {
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Owner.SetOwners(owners));
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
          console.log(error);
        });

  }
}
