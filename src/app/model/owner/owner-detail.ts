import {Pet} from '../pet/pet';

export class OwnerDetail {

  public id: number;
  public firstName: string;
  public lastName: string;
  public address: string;
  public city: string;
  public telephone: string;
  public pets: Pet[];

  constructor(options: {
    id?: number;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    telephone?: string;
    pets?: Pet[];
  } = {}) {
    this.id = options.id;
    this.firstName = options.firstName;
    this.lastName = options.lastName;
    this.address = options.address;
    this.city = options.city;
    this.telephone = options.telephone;
    this.pets = options.pets;
  }

}

