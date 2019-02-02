import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromUi from '../../shared/store/ui.reducer';
import {AppState} from '../../app.reducer';
import {OwnerService} from '../store/owner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OwnerEdit} from '../../model/owner/owner-edit';

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
    this.ownerId = this.route.snapshot.params['ownerId'];

    if (this.ownerId) { // update case
      this.ownerService.fetchOwnerEdit(this.route.snapshot.params['ownerId']).subscribe(
        (owner: OwnerEdit) => {
          if (!owner) {
            return;
          }
          this.firstName.setValue(owner.firstName);
          this.lastName.setValue(owner.lastName);
          this.address.setValue(owner.address);
          this.city.setValue(owner.city);
          this.telephone.setValue(owner.telephone);
        }
      );
    }
  }

  onSubmit() {
    const owner = new OwnerEdit({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      address: this.address.value,
      city: this.city.value,
      telephone: this.telephone.value
    });
    if (this.ownerId) { // update case : id value exists
      this.ownerService.updateOwner(this.ownerId, owner).subscribe(value => {
        this.router.navigate(['../'], {relativeTo: this.route});
      });
    } else { // create case : id value is yet absent
      this.ownerService.createOwner(owner).subscribe(createdOwner => {
        this.router.navigate(['../', createdOwner.id], {relativeTo: this.route});
      });
    }
  }
}
