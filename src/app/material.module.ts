import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {
}
