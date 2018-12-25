import {Action} from '@ngrx/store';
import {OwnerDetail} from '../../model/owner/owner-detail';
import {OwnerSearch} from '../../model/owner/owner-search.model';

export const SET_OWNERS = '[Owner] Set Owners';
export const SET_OWNER = '[Owner] Set Owner';

export class SetOwners implements Action {
  readonly type = SET_OWNERS;

  constructor(public payload: OwnerSearch) {
  }
}

export class SetOwner implements Action {
  readonly type = SET_OWNER;

  constructor(public payload: OwnerDetail) {
  }
}

export type OwnerActions = SetOwners | SetOwner;
