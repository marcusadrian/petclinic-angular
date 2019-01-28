export class OwnerEdit {

  public firstName: string;
  public lastName: string;
  public address: string;
  public city: string;
  public telephone: string;

  constructor(options: {
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    telephone?: string;
  } = {}) {
    this.firstName = options.firstName;
    this.lastName = options.lastName;
    this.address = options.address;
    this.city = options.city;
    this.telephone = options.telephone;
  }


}
