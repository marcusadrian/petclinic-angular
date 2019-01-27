import {OwnerSummary} from './owner-summary';

export interface OwnerSearchResponse {
  content?: OwnerSummary[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;

}
