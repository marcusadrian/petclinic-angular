import {ActionReducerMap} from '@ngrx/store';

import {uiReducer, UiState} from './shared/ui.reducer';
import {ownerReducer, OwnerState} from './owner/store/owner.reducer';

export interface AppState {
  ui: UiState;
  owner: OwnerState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  owner: ownerReducer
};

