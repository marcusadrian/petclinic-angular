import {Action} from '@ngrx/store';
import {OwnerSearchRequest} from '../owner-search/owner-search-request';

export const SET_OWNER_SEARCH_REQUEST = '[Owner] Set Owner Search Request';

export class SetOwnerSearchRequest implements Action {
  readonly type = SET_OWNER_SEARCH_REQUEST;

  constructor(public payload: OwnerSearchRequest) {
  }
}

export type OwnerActions = SetOwnerSearchRequest;
