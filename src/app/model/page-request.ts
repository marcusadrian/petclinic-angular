import {SortDirection} from '@angular/material';

export class PageRequest {

  public page: number;
  public size: number;
  public sortBy: string;
  public sortDirection: SortDirection;

}

export class PageRequestBuilder {
  private pageRequest: PageRequest = new PageRequest();

  page(page: number) {
    this.pageRequest.page = page;
    return this;
  }

  size(size: number) {
    this.pageRequest.size = size;
    return this;
  }

  sortBy(sortBy: string) {
    this.pageRequest.sortBy = sortBy;
    return this;
  }

  sortDirection(sortDirection: SortDirection) {
    this.pageRequest.sortDirection = sortDirection;
    return this;
  }

  build(): PageRequest {
    return {...this.pageRequest};
  }

}
