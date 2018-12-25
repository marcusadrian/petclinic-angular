import {OwnerActions, SET_OWNER, SET_OWNERS} from './owner.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StateId} from '../../StateId';
import {OwnerDetail} from '../../model/owner/owner-detail';
import {OwnerSearch} from '../../model/owner/owner-search.model';

export interface OwnerState {
  ownerSearch?: OwnerSearch;
  owner?: OwnerDetail;
}

const initialState: OwnerState = {};

export function ownerReducer(state = initialState, action: OwnerActions) {
  switch (action.type) {
    case SET_OWNERS:
      return {
        ...state,
        ownerSearch: action.payload
      };
    case SET_OWNER:
      return {
        ...state,
        owner: action.payload
      };
    default: {
      return state;
    }
  }
}

const getOwnerState = createFeatureSelector<OwnerState>(StateId.owner);
export const getOwnerSearch = createSelector(getOwnerState, (state: OwnerState) => state.ownerSearch);
export const getOwner = createSelector(getOwnerState, (state: OwnerState) => state.owner);

