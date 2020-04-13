import {Component, OnInit, ViewChild} from '@angular/core';
import {OwnerSummary} from '../../model/owner/owner-summary';
import {FormControl, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Observable} from 'rxjs';
import * as fromUi from '../../shared/store/ui.reducer';
import * as fromOwner from '../../owner/store/owner.reducer';
import {OwnerService} from '../store/owner.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {PageRequestBuilder} from '../../model/general/page-request';
import {OwnerSearchRequest} from './owner-search-request';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {OwnerSearchResponse} from '../../model/owner/owner-search-response';

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
  displayedColumns: string[] = ['name', 'address', 'city', 'telephone', 'petNames', 'show'];
  dataSource: OwnerSummary[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store<AppState>,
    private ownerService: OwnerService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // create reactive form
    this.createForm();

    // register sort and page listener (angular material)
    this.sort.sortChange.subscribe(() => {
      // If the user changes the sort order, reset back to the first page.
      this.paginator.pageIndex = 0;
      this.fetchOwners();
    });

    this.paginator.page.subscribe(() => {
      this.fetchOwners();
    });

    // listen to loading (showing spinner while loading)
    this.isLoading$ = this.store.pipe(select(fromUi.getIsLoading));
    // prepare component state
    this.store.pipe(select(fromOwner.getOwnerSearchRequest), take(1)).subscribe(
      (ownerSearchRequest: OwnerSearchRequest) => {
        if (ownerSearchRequest) {
          console.log('loading from store : ' + JSON.stringify(ownerSearchRequest));
          this.ownerSearchRequest = ownerSearchRequest;
          const pageRequest = this.ownerSearchRequest.pageRequest;
          this.paginator.pageSize = pageRequest.size;
          this.paginator.pageIndex = pageRequest.page;
          this.sort.active = this.keyBySort(pageRequest.sortBy);
          this.sort.direction = pageRequest.sortDirection;
          this.setFormValues(ownerSearchRequest);
          this.fetchOwners();

        } else {
          this.reset();
          // sort is working but header arrow won't align when resetting due to angular material bug :
          // https://github.com/angular/material2/issues/10242
        }
      }
    );
  }

  private createForm() {
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
    this.ownerSearchRequest = new OwnerSearchRequest({
      lastName: this.lastName.value,
      firstName: this.firstName.value,
      address: this.address.value,
      city: this.city.value,
      telephone: this.telephone.value,
      petName: this.petName.value
    });
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
    this.ownerService.fetchOwners(this.ownerSearchRequest).subscribe((resp: OwnerSearchResponse) => {
      this.dataSource = resp.content;
      this.paginator.pageSize = resp.size;
      this.paginator.length = resp.totalElements;
      this.paginator.pageIndex = resp.number;
    });
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
    this.reset();
  }

  private reset() {
    this.ownerSearchRequest = null;
    this.dataSource = [];
    this.paginator.pageSize = 5;
    this.paginator.length = 0;
    this.paginator.pageIndex = 0;
    this.sort.active = 'name';
    this.sort.direction = 'asc';
  }

  toAddOwner() {
    this.router.navigate(['../new'], {relativeTo: this.route});
  }
}
