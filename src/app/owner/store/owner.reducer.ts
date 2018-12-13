import {OwnerActions, SET_OWNERS} from './owner.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StateId} from '../../StateId';
import {OwnerSearchResponse} from '../model/OwnerSearchResponse';

export interface OwnerState {
  ownerSearchResponse: OwnerSearchResponse;
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
    default: {
      return state;
    }
  }
}

const getOwnerState = createFeatureSelector<OwnerState>(StateId.owner);
export const getOwnerSearchResponse = createSelector(getOwnerState, (state: OwnerState) => state.ownerSearchResponse);

