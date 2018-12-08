import {Component, OnInit} from '@angular/core';
import {OwnerSummary} from '../model/OwnerSummary';
import {FormControl, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Observable} from 'rxjs';
import * as fromUi from '../../shared/ui.reducer';
import * as fromOwner from '../../owner/store/owner.reducer';
import {OwnerService} from '../store/owner.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-owner-search',
  templateUrl: './owner-search.component.html',
  styleUrls: ['./owner-search.component.css']
})
export class OwnerSearchComponent implements OnInit {

  ownerSearchForm: FormGroup;
  lastName: FormControl;

  isLoading$: Observable<boolean>;
  owners$: Observable<OwnerSummary[]>;

  displayedColumns: string[] = ['name', 'address', 'city', 'telephone', 'petNames'];
  dataSource = new MatTableDataSource<OwnerSummary>();

  constructor(
    private store: Store<AppState>,
    private ownerService: OwnerService) {
  }

  ngOnInit() {

    this.isLoading$ = this.store.pipe(select(fromUi.getIsLoading));
    this.owners$ = this.store.pipe(select(fromOwner.getOwners));
    this.store.pipe(select(fromOwner.getOwners)).subscribe(
      (owners: OwnerSummary[]) => {
        this.dataSource.data = owners;
      }
    );
    this.lastName = new FormControl('');
    this.ownerSearchForm = new FormGroup({
      lastName: this.lastName
    });

  }

  onOwnerSearchSubmit() {
    this.ownerService.fetchOwners(this.lastName.value);
  }
}
