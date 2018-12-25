import {OwnerSearchRequest} from '../../owner/owner-search/owner-search-request';
import {OwnerSearchResponse} from './owner-search-response';

export class OwnerSearch {
  constructor(public request: OwnerSearchRequest, public response: OwnerSearchResponse) {

  }
}
