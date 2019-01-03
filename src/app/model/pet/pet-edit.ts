import {Visit} from '../visit/visit';
import {NamedItem} from '../general/named-item';

export class PetEdit {

  public id: number;
  public ownerId: number;
  public name: string;
  public birthDate: Date;
  public type: NamedItem;
  public visits: Visit[];
  public petTypes: NamedItem[];

}
