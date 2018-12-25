import {PageRequest} from '../../model/rest/page-request';

export class OwnerSearchRequest {

  public lastName: string;
  public firstName: string;
  public address: string;
  public city: string;
  public telephone: string;
  public petName: string;

  public pageRequest: PageRequest;

}
