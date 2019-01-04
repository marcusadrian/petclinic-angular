import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.reducer';
import {OwnerService} from '../../store/owner.service';
import * as fromUi from '../../../shared/ui.reducer';
import {Pet} from '../../../model/pet/pet';

@Component({
  selector: 'app-visit-edit',
  templateUrl: './visit-edit.component.html',
  styleUrls: ['./visit-edit.component.css']
})
export class VisitEditComponent implements OnInit {

  // the reactive form definitions
  visitEditForm: FormGroup;
  date: FormControl;
  description: FormControl;
  pet: Pet;
  ownerName: string;
  private petId: number;
  private ownerId: number;
  private visitId: number;

  // spinner
  isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.date = new FormControl('');
    this.description = new FormControl('');

    this.visitEditForm = new FormGroup({
      date: this.date,
      description: this.description
    });

    this.isLoading$ = this.store.pipe(select(fromUi.getIsLoading));
    this.ownerId = this.route.snapshot.params['ownerId'];
    this.petId = this.route.snapshot.params['petId'];
    this.visitId = this.route.snapshot.params['visitId'];
    this.ownerService.fetchVisit(this.ownerId, this.petId, this.visitId).subscribe(dto => {
      this.date.setValue(dto.visit.date);
      this.description.setValue(dto.visit.description);
      this.ownerName = dto.ownerName;
      this.pet = dto.pet;
    });
  }

  onSubmit() {
    console.log('todo...');
  }
}
