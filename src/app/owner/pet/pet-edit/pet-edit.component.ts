import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.reducer';
import * as fromUi from '../../../shared/ui.reducer';
import {NamedItem} from '../../../model/general/named-item';
import {OwnerService} from '../../store/owner.service';
import {PetEdit} from '../../../model/pet/pet-edit';

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
  private petId: number;
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
    this.ownerId = this.route.snapshot.params['ownerId'];
    this.petId = this.route.snapshot.params['petId'];
    this.ownerService.fetchPet(this.ownerId, this.petId).subscribe(pet => {
      this.petTypes = pet.petTypes;
      this.name.setValue(pet.name);
      this.birthday.setValue(pet.birthDate);
      this.type.setValue(pet.type ? pet.type.id : null);
    });
  }

  onSubmit() {
    const pet = new PetEdit();
    pet.id = this.petId;
    pet.ownerId = this.ownerId;
    pet.name = this.name.value;
    pet.birthDate = this.birthday.value;
    pet.type = this.petTypes.filter(petType => petType.id === this.type.value)[0];
    console.log(JSON.stringify(pet));
  }
}
