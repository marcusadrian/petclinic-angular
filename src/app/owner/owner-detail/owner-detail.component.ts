import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromUi from '../../shared/store/ui.reducer';
import {Observable} from 'rxjs';
import {AppState} from '../../app.reducer';
import {OwnerService} from '../store/owner.service';
import {OwnerDetail} from '../../model/owner/owner-detail';
import {ActivatedRoute, Router} from '@angular/router';
import {Pet} from '../../model/pet/pet';
import {Visit} from '../../model/visit/visit';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.css']
})
export class OwnerDetailComponent implements OnInit {

  isLoading$: Observable<boolean>;
  owner: OwnerDetail;
  displayedColumns: string[] = ['date', 'description', 'edit', 'delete'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromUi.getIsLoading));
    this.ownerService.fetchOwner(this.route.snapshot.params['ownerId'])
      .subscribe((owner: OwnerDetail) => this.owner = owner);
  }

  toEditOwner() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  toAddPet() {
    this.router.navigate(['pets', 'new'], {relativeTo: this.route});
  }

  toEditPet(pet: Pet) {
    this.router.navigate(['pets', pet.id, 'edit'], {relativeTo: this.route});
  }

  toAddVisit(pet: Pet) {
    this.router.navigate(['pets', pet.id, 'visits', 'new'], {relativeTo: this.route});
  }

  toEditVisit(pet: Pet, visit: Visit) {
    this.router.navigate(['pets', pet.id, 'visits', visit.id, 'edit'], {relativeTo: this.route});
  }

  hasVisits(pet: Pet) {
    return pet.visits.length > 0;
  }

  deleteOwner() {
    this.ownerService.deleteOwner(this.owner.id).subscribe(() => {
      this.router.navigate(['..', 'search'], {relativeTo: this.route});
    });
  }

  deletePet(pet: Pet) {
    this.ownerService.deletePet(this.owner.id, pet.id).subscribe(() => {
      this.ownerService.fetchOwner(this.owner.id)
        .subscribe((owner: OwnerDetail) => this.owner = owner);
    });
  }

  deleteVisit(pet: Pet, visit: Visit) {
    this.ownerService.deleteVisit(this.owner.id, pet.id, visit.id).subscribe(() => {
      this.ownerService.fetchOwner(this.owner.id)
        .subscribe((owner: OwnerDetail) => this.owner = owner);
    });
  }
}
