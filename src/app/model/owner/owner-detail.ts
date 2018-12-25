import {Pet} from '../pet/pet';

export interface OwnerDetail {

  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  telephone: string;
  pets: Pet[];

}

