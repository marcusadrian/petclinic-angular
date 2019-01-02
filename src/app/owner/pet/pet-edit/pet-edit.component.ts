import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.reducer';
import * as fromUi from '../../../shared/ui.reducer';
import {NamedItem} from '../../../model/general/named-item';
import {OwnerService} from '../../store/owner.service';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent implements OnInit {

  // the reactive form definitions
  petEditForm: FormGroup;
  name: FormControl;
  birthday: FormControl;
  type: FormControl;
  petTypes: NamedItem[];
  private id: number;
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
    this.name = new FormControl('');
    this.birthday = new FormControl('');
    this.type = new FormControl('');

    this.petEditForm = new FormGroup({
      name: this.name,
      birthday: this.birthday,
      type: this.type,
    });

    this.isLoading$ = this.store.pipe(select(fromUi.getIsLoading));
    const ownerId = this.route.snapshot.params['id'];
    const petId = this.route.snapshot.params['petId'];
    this.ownerService.fetchPet(ownerId, petId).subscribe(pet => {
      this.id = pet.id;
      this.ownerId = pet.ownerId;
      this.name.setValue(pet.name);
      this.petTypes = pet.petTypes;
    });
  }

  onSubmit() {

  }
}
