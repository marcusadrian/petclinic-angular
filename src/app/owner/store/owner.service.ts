import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OwnerSearchResponse} from '../../model/owner/owner-search-response';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import * as Owner from '../../owner/store/owner.actions';
import {OwnerSearchRequest} from '../owner-search/owner-search-request';
import {OwnerDetail} from '../../model/owner/owner-detail';
import {finalize, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PetEdit} from '../../model/pet/pet-edit';
import {VisitEdit} from '../../model/visit/visit-edit';
import {PetClinicUrls} from '../../shared/PetClinicUrls';

@Injectable()
export class OwnerService {

  constructor(private httpClient: HttpClient,
              private store: Store<AppState>) {
  }

  fetchOwners(request: OwnerSearchRequest): Observable<OwnerSearchResponse> {

    console.log(request);
    let params = new HttpParams()
      .set('firstName', request.firstName)
      .set('lastName', request.lastName)
      .set('address', request.address)
      .set('city', request.city)
      .set('telephone', request.telephone)
      .set('petName', request.petName);
    const pageRequest = request.pageRequest;
    if (pageRequest) {
      params = params
        .set('page', pageRequest.page.toString())
        .set('size', pageRequest.size.toString())
        .set('sort', pageRequest.sortBy.toString() + ',' + pageRequest.sortDirection);
    }
    params = this.cleanUpHttpParams(params);
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.get<OwnerSearchResponse>(PetClinicUrls.ownerSearchPath(), {params: params})
      .pipe(
        tap(() => {
          this.store.dispatch(new Owner.SetOwnerSearchRequest(request));
        }),
        finalize(() => this.store.dispatch(new UI.StopLoading()))
      );

  }

  fetchOwner(id: number): Observable<OwnerDetail> {
    console.log('fetching owner ' + id + '[=id]');
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.get<OwnerDetail>(PetClinicUrls.ownerPath(id))
      .pipe(
        finalize(() => this.store.dispatch(new UI.StopLoading()))
      );
  }

  fetchPet(ownerId: number, petId: number): Observable<PetEdit> {
    let url: string;
    if (petId) {
      url = PetClinicUrls.petPath(ownerId, petId);
    } else {
      url = PetClinicUrls.newPetPath(ownerId);
    }
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.get<PetEdit>(url)
      .pipe(
        finalize(() => this.store.dispatch(new UI.StopLoading()))
      );
  }

  fetchVisit(ownerId: number, petId: number, visitId: number): Observable<VisitEdit> {
    let url: string;
    if (visitId) {
      url = PetClinicUrls.visitPath(ownerId, petId, visitId);
    } else {
      url = PetClinicUrls.newVisitPath(ownerId, petId);
    }
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.get<VisitEdit>(url)
      .pipe(
        finalize(() => this.store.dispatch(new UI.StopLoading()))
      );
  }

  createOwner(owner: OwnerDetail) {
    console.log('create owner ' + JSON.stringify(owner));
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.put<OwnerDetail>(PetClinicUrls.ownersPath(), owner)
      .pipe(finalize(() => this.store.dispatch(new UI.StopLoading())));
  }

  updateOwner(owner: OwnerDetail) {
    console.log('update owner ' + JSON.stringify(owner));
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.post(PetClinicUrls.ownerPath(owner.id), owner)
      .pipe(finalize(() => this.store.dispatch(new UI.StopLoading())));
  }

  deleteOwner(ownerId: number) {
    console.log('delete owner', ownerId);
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.delete(PetClinicUrls.ownerPath(ownerId))
      .pipe(finalize(() => this.store.dispatch(new UI.StopLoading())));
  }

  createPet(pet: PetEdit) {
    console.log('create pet', JSON.stringify(pet));
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.put(PetClinicUrls.petsPath(pet.ownerId), pet)
      .pipe(finalize(() => this.store.dispatch(new UI.StopLoading())));
  }

  updatePet(pet: PetEdit) {
    console.log('update pet', JSON.stringify(pet));
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.post(PetClinicUrls.petPath(pet.ownerId, pet.id), pet)
      .pipe(finalize(() => this.store.dispatch(new UI.StopLoading())));
  }

  deletePet(ownerId: number, petId: number) {
    console.log('delete pet', petId);
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.delete(PetClinicUrls.petPath(ownerId, petId))
      .pipe(finalize(() => this.store.dispatch(new UI.StopLoading())));
  }

  createVisit(ownerId: number, visit: VisitEdit) {
    console.log('create visit', JSON.stringify(visit));
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.put(PetClinicUrls.visitsPath(ownerId, visit.pet.id), visit)
      .pipe(finalize(() => this.store.dispatch(new UI.StopLoading())));
  }

  updateVisit(ownerId: number, visit: VisitEdit) {
    console.log('update visit', JSON.stringify(visit));
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.post(PetClinicUrls.visitPath(ownerId, visit.pet.id, visit.visit.id), visit)
      .pipe(finalize(() => this.store.dispatch(new UI.StopLoading())));
  }

  deleteVisit(ownerId: number, petId: number, visitId: number) {
    console.log('delete visit', visitId);
    // start spinner
    this.store.dispatch(new UI.StartLoading());
    // do rest call
    return this.httpClient.delete(PetClinicUrls.visitPath(ownerId, petId, visitId))
      .pipe(finalize(() => this.store.dispatch(new UI.StopLoading())));
  }

  resetOwnerSearch() {
    this.store.dispatch(new Owner.SetOwnerSearchRequest(null));
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
