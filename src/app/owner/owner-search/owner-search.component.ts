import {Component, OnInit, ViewChild} from '@angular/core';
import {OwnerSummary} from '../../model/owner/owner-summary';
import {FormControl, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Observable} from 'rxjs';
import * as fromUi from '../../shared/ui.reducer';
import * as fromOwner from '../../owner/store/owner.reducer';
import {OwnerService} from '../store/owner.service';
import {MatPaginator, MatSort} from '@angular/material';
import {PageRequestBuilder} from '../../model/rest/page-request';
import {OwnerSearchRequest} from './owner-search-request';
import {ActivatedRoute, Router} from '@angular/router';
import {OwnerSearch} from '../../model/owner/owner-search';

@Component({
  selector: 'app-owner-search',
  templateUrl: './owner-search.component.html',
  styleUrls: ['./owner-search.component.css']
})
export class OwnerSearchComponent implements OnInit {

  // the reactive form definitions
  ownerSearchForm: FormGroup;
  lastName: FormControl;
  firstName: FormControl;
  address: FormControl;
  city: FormControl;
  telephone: FormControl;
  petName: FormControl;

  // DTO containing all the necessary fields for the rest call
  ownerSearchRequest: OwnerSearchRequest;

  // spinner
  isLoading$: Observable<boolean>;

  // mat-table
  displayedColumns: string[] = ['name', 'address', 'city', 'telephone', 'petNames', 'action'];
  dataSource: OwnerSummary[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<AppState>,
    private ownerService: OwnerService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.lastName = new FormControl('');
    this.firstName = new FormControl('');
    this.address = new FormControl('');
    this.city = new FormControl('');
    this.telephone = new FormControl('');
    this.petName = new FormControl('');

    this.ownerSearchForm = new FormGroup({
      lastName: this.lastName,
      firstName: this.firstName,
      address: this.address,
      city: this.city,
      telephone: this.telephone,
      petName: this.petName,
    });

    this.sort.sortChange.subscribe(() => {
      // If the user changes the sort order, reset back to the first page.
      this.paginator.pageIndex = 0;
      this.fetchOwners();
    });

    this.paginator.page.subscribe(() => {
      this.fetchOwners();
    });

    this.isLoading$ = this.store.pipe(select(fromUi.getIsLoading));
    this.store.pipe(select(fromOwner.getOwnerSearch)).subscribe(
      (search: OwnerSearch) => {
        if (!search) { // initialisation at the very first time or after resetting
          this.ownerSearchRequest = null;
          this.dataSource = [];
          this.paginator.pageSize = 5;
          this.paginator.length = 0;
          this.paginator.pageIndex = 0;
          this.sort.active = 'name';
          this.sort.direction = 'asc';
          // sort is working but header arrow won't align when resetting due to angular material bug :
          // https://github.com/angular/material2/issues/10242
          return;
        }
        this.ownerSearchRequest = search.request;
        const resp = search.response;
        this.dataSource = resp._embedded ? resp._embedded.owners : [];
        const page = resp.page;
        if (page) {
          this.paginator.pageSize = page.size;
          this.paginator.length = page.totalElements;
          this.paginator.pageIndex = page.number;
        }
        const pageRequest = this.ownerSearchRequest.pageRequest;
        this.sort.active = this.keyBySort(pageRequest.sortBy);
        this.sort.direction = pageRequest.sortDirection;
        this.setFormValues(search.request);
      }
    );
  }

  // to conform to the last state in case we come back to this page (content cache)
  private setFormValues(criteria: OwnerSearchRequest) {
    if (!criteria) {
      return;
    }
    this.lastName.setValue(criteria.lastName);
    this.firstName.setValue(criteria.firstName);
    this.address.setValue(criteria.address);
    this.city.setValue(criteria.city);
    this.telephone.setValue(criteria.telephone);
    this.petName.setValue(criteria.petName);
  }

  onSubmit() {
    this.paginator.pageIndex = 0;
    // only take into account a criteria change when user validates pressing the submit button
    this.ownerSearchRequest = new OwnerSearchRequest();
    this.ownerSearchRequest.lastName = this.lastName.value;
    this.ownerSearchRequest.firstName = this.firstName.value;
    this.ownerSearchRequest.address = this.address.value;
    this.ownerSearchRequest.city = this.city.value;
    this.ownerSearchRequest.telephone = this.telephone.value;
    this.ownerSearchRequest.petName = this.petName.value;
    this.fetchOwners();
  }

  private fetchOwners() {
    this.ownerSearchRequest.pageRequest = new PageRequestBuilder()
      .page(this.paginator.pageIndex)
      .size(this.paginator.pageSize)
      .sortBy(this.sortByKey(this.sort.active))
      .sortDirection(this.sort.direction)
      .build();
    console.log(JSON.stringify(this.ownerSearchRequest));
    this.ownerService.fetchOwners(this.ownerSearchRequest);
  }

  private sortByKey(key: string) {
    if (key === 'name') {
      return 'lastName';
    }
    return key;
  }

  private keyBySort(sort: string) {
    if (sort === 'lastName') {
      return 'name';
    }
    return sort;
  }

  onAskForDetail(id: number) {
    console.log('onAskForDetail : ' + id);
    this.router.navigate(['../', id], {relativeTo: this.route});
  }

  noOwnersFound(): boolean {
    return this.ownerSearchRequest != null && this.paginator.length === 0;
  }

  hideTable(): boolean {
    return this.ownerSearchRequest == null || this.noOwnersFound();
  }

  onReset() {
    // clean cache
    this.ownerService.resetOwnerSearch();
  }
}
