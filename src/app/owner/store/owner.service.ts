import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OwnerSearchResponse} from '../../model/owner/owner-search-response';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import * as Owner from '../../owner/store/owner.actions';
import {OwnerSearchRequest} from '../owner-search/owner-search-request';
import {OwnerDetail} from '../../model/owner/owner-detail';
import {OwnerSearch} from '../../model/owner/owner-search';

@Injectable()
export class OwnerService {

  constructor(private httpClient: HttpClient,
              private store: Store<AppState>) {
  }

  fetchOwners(request: OwnerSearchRequest) {

    console.log(request);
    let params = new HttpParams()
      .set('firstName', request.firstName)
      .set('lastName', request.lastName)
      .set('address', request.address)
      .set('city', request.city)
      .set('telephone', request.telephone)
      .set('petName', request.petName);
    if (request.pageRequest) {
      params = params
        .set('page', request.pageRequest.page.toString())
        .set('size', request.pageRequest.size.toString())
        .set('sort', request.pageRequest.sortBy.toString() + ',' + request.pageRequest.sortDirection);
    }
    params = this.cleanUpHttpParams(params);
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    this.httpClient.get<OwnerSearchResponse>('http://localhost:8080/my-petclinic/owners/search', {params: params})
      .subscribe((ownerSearchResponse: OwnerSearchResponse) => {
          // stop spinner
          this.store.dispatch(new UI.StopLoading());
          // put into store
          this.store.dispatch(new Owner.SetOwners(new OwnerSearch(request, ownerSearchResponse)));
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

  resetOwnerSearch() {
    this.store.dispatch(new Owner.SetOwners(null));
  }

  // remove null/undefined and empty
  private cleanUpHttpParams(params: HttpParams): HttpParams {
    let cleanedUpParams = new HttpParams();
    params.keys()
      .filter(key => {
        const value = params.get(key);
        return value && value.length > 0;
      })
      .forEach(key => cleanedUpParams = cleanedUpParams.set(key, params.get(key)));
    return cleanedUpParams;
  }
}
