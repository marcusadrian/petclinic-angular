import {Visit} from '../visit/visit';

export interface Pet {

  id: number;
  name: string;
  birthDate: Date;
  type: string;
  visits: Visit[];

}
