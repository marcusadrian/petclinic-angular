import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OwnerSearchResponse} from '../model/OwnerSearchResponse';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import * as Owner from '../../owner/store/owner.actions';

@Injectable()
export class OwnerService {

  constructor(private httpClient: HttpClient,
              private store: Store<AppState>) {
  }

  fetchOwners(lastName: string) {

    console.log(lastName);
    this.store.dispatch(new UI.StartLoading());
    this.httpClient.get<OwnerSearchResponse>('http://localhost:8080/my-petclinic/owners/search?lastName=' + lastName)
      .subscribe((ownerSearchResponse: OwnerSearchResponse) => {
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Owner.SetOwners(ownerSearchResponse));
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
          console.log(error);
        });

  }
}
