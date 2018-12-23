import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OwnerSearchResponse} from '../model/OwnerSearchResponse';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import * as Owner from '../../owner/store/owner.actions';
import {OwnerSearchRequest} from '../owner-search/owner-search-request';
import {OwnerDetail} from '../model/owner-detail';
import {OwnerSearch} from '../model/owner-search.model';

@Injectable()
export class OwnerService {

  constructor(private httpClient: HttpClient,
              private store: Store<AppState>) {
  }

  fetchOwners(criteria: OwnerSearchRequest) {

    console.log(criteria);
    let params = new HttpParams()
      .set('firstName', criteria.firstName)
      .set('lastName', criteria.lastName)
      .set('address', criteria.address)
      .set('city', criteria.city)
      .set('telephone', criteria.telephone)
      .set('petName', criteria.petName);
    if (criteria.pageRequest) {
      params = params
        .set('page', criteria.pageRequest.page.toString())
        .set('size', criteria.pageRequest.size.toString())
        .set('sort', criteria.pageRequest.sortBy.toString() + ',' + criteria.pageRequest.sortDirection);
    }
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    this.httpClient.get<OwnerSearchResponse>('http://localhost:8080/my-petclinic/owners/search', {params: params})
      .subscribe((ownerSearchResponse: OwnerSearchResponse) => {
          // stop spinner
          this.store.dispatch(new UI.StopLoading());
          // put into store
          this.store.dispatch(new Owner.SetOwners(new OwnerSearch(criteria, ownerSearchResponse)));
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
          console.log(error);
        });

  }

  fetchOwner(id: number) {
    console.log('fetching owner ' + id + '[=id]');
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    this.httpClient.get<OwnerDetail>('http://localhost:8080/my-petclinic/owners/' + id)
      .subscribe((owner: OwnerDetail) => {
          // stop spinner
          this.store.dispatch(new UI.StopLoading());
          // put into store
          this.store.dispatch(new Owner.SetOwner(owner));
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
          console.log(error);
        });

  }
}
