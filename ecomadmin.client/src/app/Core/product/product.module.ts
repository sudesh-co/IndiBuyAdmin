import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { SharedModule } from '../../Shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VariantsModule } from '../variants/variants.module';


@NgModule({
  declarations: [
    ProductListingComponent,
    AddEditProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    VariantsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class ProductModule { }
