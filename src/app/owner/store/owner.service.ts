import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OwnerSearchResponse} from '../model/OwnerSearchResponse';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import * as Owner from '../../owner/store/owner.actions';
import {PageRequest} from '../../model/page-request';
import {OwnerSearchCriteria} from '../owner-search/owner-search-criteria';

@Injectable()
export class OwnerService {

  constructor(private httpClient: HttpClient,
              private store: Store<AppState>) {
  }

  fetchOwners(searchCriteria: OwnerSearchCriteria, pageRequest: PageRequest) {

    console.log(searchCriteria);
    let params = new HttpParams()
      .set('firstName', searchCriteria.firstName)
      .set('lastName', searchCriteria.lastName)
      .set('address', searchCriteria.address)
      .set('city', searchCriteria.city)
      .set('telephone', searchCriteria.telephone);
    if (pageRequest) {
      params = params
        .set('page', pageRequest.page.toString())
        .set('size', pageRequest.size.toString())
        .set('sort', pageRequest.sortBy.toString() + ',' + pageRequest.sortDirection);
    }
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    this.httpClient.get<OwnerSearchResponse>('http://localhost:8080/my-petclinic/owners/search', {params: params})
      .subscribe((ownerSearchResponse: OwnerSearchResponse) => {
          // stop spinner
          this.store.dispatch(new UI.StopLoading());
          // put into store
          this.store.dispatch(new Owner.SetOwners(ownerSearchResponse));
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
          console.log(error);
        });

  }
}
