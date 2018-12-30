import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromUi from '../../shared/ui.reducer';
import {AppState} from '../../app.reducer';
import * as fromOwner from '../store/owner.reducer';
import {OwnerDetail} from '../../model/owner/owner-detail';
import {OwnerService} from '../store/owner.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {

  // the reactive form definitions
  ownerEditForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  address: FormControl;
  city: FormControl;
  telephone: FormControl;
  private ownerId: number;


  // spinner
  isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.lastName = new FormControl('');
    this.firstName = new FormControl('');
    this.address = new FormControl('');
    this.city = new FormControl('');
    this.telephone = new FormControl('');

    this.ownerEditForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      city: this.city,
      telephone: this.telephone,
    });

    this.isLoading$ = this.store.pipe(select(fromUi.getIsLoading));
    this.ownerService.fetchOwner(this.route.snapshot.params['id']);
    this.store.pipe(select(fromOwner.getOwner)).subscribe(
      (owner: OwnerDetail) => {
        if (!owner) {
          return;
        }
        this.ownerId = owner.id;
        this.firstName.setValue(owner.firstName);
        this.lastName.setValue(owner.lastName);
        this.address.setValue(owner.address);
        this.city.setValue(owner.city);
        this.telephone.setValue(owner.telephone);
      }
    );
  }

  onSubmit() {

  }
}
