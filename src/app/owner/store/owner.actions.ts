import {Action} from '@ngrx/store';
import {OwnerDetail} from '../../model/owner/owner-detail';
import {OwnerSearchRequest} from '../owner-search/owner-search-request';

export const SET_OWNER_SEARCH_REQUEST = '[Owner] Set Owners';
export const SET_OWNER = '[Owner] Set Owner';

export class SetOwnerSearchRequest implements Action {
  readonly type = SET_OWNER_SEARCH_REQUEST;

  constructor(public payload: OwnerSearchRequest) {
  }
}

export class SetOwner implements Action {
  readonly type = SET_OWNER;

  constructor(public payload: OwnerDetail) {
  }
}

export type OwnerActions = SetOwnerSearchRequest | SetOwner;
