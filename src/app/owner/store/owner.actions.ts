import {Action} from '@ngrx/store';
import {OwnerSummary} from '../model/OwnerSummary';

export const SET_OWNERS = '[Owner] Set Owners';

export class SetOwners implements Action {
  readonly type = SET_OWNERS;
  constructor(public payload: OwnerSummary[]) {}
}

export type OwnerActions = SetOwners;
