import {Action} from '@ngrx/store';
import {OwnerSearchResponse} from '../model/OwnerSearchResponse';

export const SET_OWNERS = '[Owner] Set Owners';

export class SetOwners implements Action {
  readonly type = SET_OWNERS;

  constructor(public payload: OwnerSearchResponse) {
  }
}

export type OwnerActions = SetOwners;
