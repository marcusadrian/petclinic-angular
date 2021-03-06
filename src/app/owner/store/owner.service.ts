import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OwnerSearchResponse} from '../../model/owner/owner-search-response';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as Owner from '../../owner/store/owner.actions';
import {OwnerSearchRequest} from '../owner-search/owner-search-request';
import {OwnerDetail} from '../../model/owner/owner-detail';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PetEdit} from '../../model/pet/pet-edit';
import {VisitEdit} from '../../model/visit/visit-edit';
import {PetClinicUrls} from '../../shared/pet-clinic-urls';
import {OwnerEdit} from '../../model/owner/owner-edit';
import {Item} from '../../model/general/item';

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
    return this.httpClient.get<OwnerSearchResponse>(PetClinicUrls.searchOwnersPath(), {params: params})
      .pipe(
        tap(() => {
          this.store.dispatch(new Owner.SetOwnerSearchRequest(request));
        })
      );

  }

  fetchOwner(id: number): Observable<OwnerDetail> {
    console.log('fetching owner', id, '[=id]');
    return this.httpClient.get<OwnerDetail>(PetClinicUrls.ownerPath(id));
  }

  fetchOwnerEdit(id: number): Observable<OwnerEdit> {
    console.log('fetching owner edit', id, '[=id]');
    return this.httpClient.get<OwnerEdit>(PetClinicUrls.editOwnerPath(id));
  }

  fetchPetEdit(ownerId: number, petId: number): Observable<PetEdit> {
    console.log('fetching pet edit', ownerId, '[=ownerId]', petId, '[=petId]');
    let url: string;
    if (petId) {
      url = PetClinicUrls.editPetPath(ownerId, petId);
    } else {
      url = PetClinicUrls.newPetPath(ownerId);
    }
    return this.httpClient.get<PetEdit>(url);
  }

  fetchVisitEdit(ownerId: number, petId: number, visitId: number): Observable<VisitEdit> {
    console.log('fetching visit edit', ownerId, '[=ownerId]', petId, '[=petId]', visitId, '[=visitId]');
    let url: string;
    if (visitId) {
      url = PetClinicUrls.editVisitPath(ownerId, petId, visitId);
    } else {
      url = PetClinicUrls.newVisitPath(ownerId, petId);
    }
    return this.httpClient.get<VisitEdit>(url);
  }

  createOwner(owner: OwnerEdit) {
    console.log('create owner', JSON.stringify(owner));
    return this.httpClient.post<Item>(PetClinicUrls.ownersPath(), owner);
  }

  updateOwner(ownerId: number, owner: OwnerEdit) {
    console.log('update owner', ownerId, '[=ownerId]', JSON.stringify(owner));
    return this.httpClient.put(PetClinicUrls.ownerPath(ownerId), owner);
  }

  deleteOwner(ownerId: number) {
    console.log('delete owner', ownerId, '[=ownerId]');
    return this.httpClient.delete(PetClinicUrls.ownerPath(ownerId));
  }

  createPet(ownerId: number, pet: PetEdit) {
    console.log('create pet', ownerId, '[=ownerId]', JSON.stringify(pet));
    return this.httpClient.post(PetClinicUrls.petsPath(ownerId), pet);
  }

  updatePet(ownerId: number, petId: number, pet: PetEdit) {
    console.log('update pet', ownerId, '[=ownerId]', petId, '[=petId]', JSON.stringify(pet));
    return this.httpClient.put(PetClinicUrls.petPath(ownerId, petId), pet);
  }

  deletePet(ownerId: number, petId: number) {
    console.log('delete pet', ownerId, '[=ownerId]', petId, '[=petId]');
    return this.httpClient.delete(PetClinicUrls.petPath(ownerId, petId));
  }

  createVisit(ownerId: number, petId: number, visit: VisitEdit) {
    console.log('create visit', ownerId, '[=ownerId]', petId, '[=petId]', JSON.stringify(visit));
    return this.httpClient.post(PetClinicUrls.visitsPath(ownerId, petId), visit);
  }

  updateVisit(ownerId: number, petId: number, visitId: number, visit: VisitEdit) {
    console.log('update visit', ownerId, '[=ownerId]', petId, '[=petId]', visitId, '[=visitId]', JSON.stringify(visit));
    return this.httpClient.put(PetClinicUrls.visitPath(ownerId, petId, visitId), visit);
  }

  deleteVisit(ownerId: number, petId: number, visitId: number) {
    console.log('delete visit', ownerId, '[=ownerId]', petId, '[=petId]', visitId, '[=visitId]');
    return this.httpClient.delete(PetClinicUrls.visitPath(ownerId, petId, visitId));
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
