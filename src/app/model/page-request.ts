export class PageRequest {

  public page: number;
  public size: number;

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

  build(): PageRequest {
    return {...this.pageRequest};
  }

}
