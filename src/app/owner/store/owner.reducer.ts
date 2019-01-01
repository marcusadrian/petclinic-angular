import {OwnerActions, SET_OWNER_SEARCH_REQUEST} from './owner.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StateId} from '../../StateId';
import {OwnerSearchRequest} from '../owner-search/owner-search-request';

export interface OwnerState {
  ownerSearchRequest?: OwnerSearchRequest;
}

const initialState: OwnerState = {};

export function ownerReducer(state = initialState, action: OwnerActions) {
  switch (action.type) {
    case SET_OWNER_SEARCH_REQUEST:
      return {
        ...state,
        ownerSearchRequest: {...action.payload}
      };
    default: {
      return state;
    }
  }
}

const getOwnerState = createFeatureSelector<OwnerState>(StateId.owner);
export const getOwnerSearchRequest = createSelector(getOwnerState, (state: OwnerState) => state.ownerSearchRequest);

