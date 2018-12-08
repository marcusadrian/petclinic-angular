import {OwnerSummary} from '../model/OwnerSummary';
import {OwnerActions, SET_OWNERS} from './owner.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StateId} from '../../StateId';

export interface OwnerState {
  owners: OwnerSummary[];
}

const initialState: OwnerState = {
  owners: []
};

export function ownerReducer(state = initialState, action: OwnerActions) {
  switch (action.type) {
    case SET_OWNERS:
      return {
        ...state,
        owners: action.payload
      };
    default: {
      return state;
    }
  }
}

const getOwnerState = createFeatureSelector<OwnerState>(StateId.owner);
export const getOwners = createSelector(getOwnerState, (state: OwnerState) => state.owners);

