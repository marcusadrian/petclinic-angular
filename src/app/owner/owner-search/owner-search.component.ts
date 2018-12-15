import {Component, OnInit, ViewChild} from '@angular/core';
import {OwnerSummary} from '../model/OwnerSummary';
import {FormControl, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Observable} from 'rxjs';
import * as fromUi from '../../shared/ui.reducer';
import * as fromOwner from '../../owner/store/owner.reducer';
import {OwnerService} from '../store/owner.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {OwnerSearchResponse} from '../model/OwnerSearchResponse';
import {Page} from '../../model/Page';
import {PageRequestBuilder} from '../../model/page-request';

@Component({
  selector: 'app-owner-search',
  templateUrl: './owner-search.component.html',
  styleUrls: ['./owner-search.component.css']
})
export class OwnerSearchComponent implements OnInit {

  ownerSearchForm: FormGroup;
  lastName: FormControl;

  isLoading$: Observable<boolean>;

  displayedColumns: string[] = ['name', 'address', 'city', 'telephone', 'petNames'];
  dataSource = new MatTableDataSource<OwnerSummary>();
  page: Page;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<AppState>,
    private ownerService: OwnerService) {
  }

  ngOnInit() {

    this.isLoading$ = this.store.pipe(select(fromUi.getIsLoading));
    this.store.pipe(select(fromOwner.getOwnerSearchResponse)).subscribe(
      (resp: OwnerSearchResponse) => {
        this.dataSource.data = resp._embedded ? resp._embedded.owners : [];
        this.page = resp.page;
        if (this.page) {
          this.paginator.pageSize = this.page.size;
          this.paginator.length = this.page.totalElements;
          this.paginator.pageIndex = this.page.number;
        }
      }
    );
    this.lastName = new FormControl('');
    this.ownerSearchForm = new FormGroup({
      lastName: this.lastName
    });


    this.sort.sortChange.subscribe(() => {
      // If the user changes the sort order, reset back to the first page.
      this.paginator.pageIndex = 0;
      this.onOwnerSearchSubmit();
    });

    this.paginator.page.subscribe(() => {
      // if (this.page.size)
      this.onOwnerSearchSubmit();
    });
  }

  onOwnerSearchSubmit() {

    console.log('sort.active : ' + this.sort.active);
    console.log('sort.direction : ' + this.sort.direction);
    console.log('paginator.pageIndex : ' + this.paginator.pageIndex);
    console.log('paginator.pageSize : ' + this.paginator.pageSize);

    this.ownerService.fetchOwners(
      this.lastName.value,
      new PageRequestBuilder()
        .page(this.paginator.pageIndex)
        .size(this.paginator.pageSize)
        .sortBy(this.sortByKey(this.sort.active))
        .sortDirection(this.sort.direction)
        .build());
  }

  sortByKey(sort: string) {
    if (sort === 'name') {
      return 'lastName';
    }
    return sort;
  }

}
