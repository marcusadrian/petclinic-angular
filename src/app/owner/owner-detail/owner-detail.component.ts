import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromUi from '../../shared/ui.reducer';
import {Observable} from 'rxjs';
import {AppState} from '../../app.reducer';
import {OwnerService} from '../store/owner.service';
import {OwnerDetail} from '../../model/owner/owner-detail';
import {ActivatedRoute, Router} from '@angular/router';
import {Pet} from '../../model/pet/pet';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.css']
})
export class OwnerDetailComponent implements OnInit {

  isLoading$: Observable<boolean>;
  owner: OwnerDetail;

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

  toOwnerEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  toAddNewPet() {
    this.router.navigate(['pets', 'new'], {relativeTo: this.route});
  }

  toEditPet(pet: Pet) {
    this.router.navigate(['pets', pet.id, 'edit'], {relativeTo: this.route});
  }
}
