import {OwnerSummaryLinks} from './OwnerSummaryLinks';

export interface OwnerSummary {

  id: number;
  name: string;
  address: string;
  city: string;
  telephone: string;
  petNames: string;
  _links: OwnerSummaryLinks;

}

