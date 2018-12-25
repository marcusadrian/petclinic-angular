import {OwnerSummaryLinks} from './owner-summary-links';

export interface OwnerSummary {

  id: number;
  name: string;
  address: string;
  city: string;
  telephone: string;
  petNames: string;
  _links: OwnerSummaryLinks;

}

