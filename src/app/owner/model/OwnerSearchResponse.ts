import {OwnerSummary} from './OwnerSummary';
import {Page} from '../../model/Page';

export interface OwnerSearchResponse {
  _embedded?: Owners;
  page?: Page;
}

export interface Owners {
  owners: OwnerSummary[];
}
