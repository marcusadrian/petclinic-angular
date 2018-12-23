import {OwnerSearchRequest} from '../owner-search/owner-search-request';
import {OwnerSearchResponse} from './OwnerSearchResponse';

export class OwnerSearch {
  constructor(public request: OwnerSearchRequest, public response: OwnerSearchResponse) {

  }
}
