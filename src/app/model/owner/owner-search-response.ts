import {OwnerSummary} from './owner-summary';
import {Page} from '../rest/Page';

export interface OwnerSearchResponse {
  _embedded?: Owners;
  page?: Page;
}

export interface Owners {
  owners: OwnerSummary[];
}
