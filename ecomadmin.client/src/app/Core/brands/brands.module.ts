import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandslistingComponent } from './brandslisting/brandslisting.component';
import { AddEditBrandsComponent } from './brandslisting/add-edit-brands/add-edit-brands.component';
import { SharedModule } from '../../Shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BrandslistingComponent,
    AddEditBrandsComponent
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class BrandsModule { }
