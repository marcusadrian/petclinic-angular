import {PageRequest} from '../../model/general/page-request';

export class OwnerSearchRequest {

  public lastName: string;
  public firstName: string;
  public address: string;
  public city: string;
  public telephone: string;
  public petName: string;

  public pageRequest: PageRequest;

  constructor(options: {
    lastName?: string,
    firstName?: string,
    address?: string,
    city?: string,
    telephone?: string,
    petName?: string,
    pageRequest?: string
  } = {}) {
    this.lastName = options.lastName;
    this.firstName = options.firstName;
    this.address = options.address;
    this.city = options.city;
    this.telephone = options.telephone;
    this.petName = options.petName;
  }

}
