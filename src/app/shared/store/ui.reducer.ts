import {START_LOADING, STOP_LOADING, UIActions} from './ui.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StateId} from './state-id';

export interface UiState {
  isLoading: boolean;
}

const initialState: UiState = {
  isLoading: false
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true
      };
    case STOP_LOADING:
      return {
        isLoading: false
      };
    default: {
      return state;
    }
  }
}

const getUiState = createFeatureSelector<UiState>(StateId.ui);
export const getIsLoading = createSelector(getUiState, (state: UiState) => state.isLoading);

