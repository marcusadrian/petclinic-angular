import {OwnerActions, SET_OWNER, SET_OWNERS} from './owner.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StateId} from '../../StateId';
import {OwnerSearchResponse} from '../model/OwnerSearchResponse';
import {OwnerDetail} from '../model/owner-detail';

export interface OwnerState {
  ownerSearchResponse: OwnerSearchResponse;
  owner?: OwnerDetail;
}

const initialState: OwnerState = {
  ownerSearchResponse: {}
};

export function ownerReducer(state = initialState, action: OwnerActions) {
  switch (action.type) {
    case SET_OWNERS:
      return {
        ...state,
        ownerSearchResponse: action.payload
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
export const getOwnerSearchResponse = createSelector(getOwnerState, (state: OwnerState) => state.ownerSearchResponse);
export const getOwner = createSelector(getOwnerState, (state: OwnerState) => state.owner);

