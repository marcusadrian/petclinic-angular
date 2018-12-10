import {OwnerSummary} from './OwnerSummary';

export interface OwnerSearchResponse {
  _embedded?: Owners;
}

export interface Owners {
  owners: OwnerSummary[];
}
