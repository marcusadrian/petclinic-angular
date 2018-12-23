import {OwnerSearchCriteria} from '../owner-search/owner-search-criteria';
import {OwnerSearchResponse} from './OwnerSearchResponse';

export class OwnerSearch {
  constructor(public request: OwnerSearchCriteria, public response: OwnerSearchResponse) {

  }
}
