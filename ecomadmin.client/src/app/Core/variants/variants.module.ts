import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariantsRoutingModule } from './variants-routing.module';
import { VarientAttributeMappingComponent } from './varient-attribute-mapping/varient-attribute-mapping.component';
import { ProductVarientsComponent } from './product-varients/product-varients.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../Shared/shared.module';
import { AddEditProductVariantComponent } from './product-varients/add-edit-product-variant/add-edit-product-variant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditVariantAttributeMappingComponent } from './varient-attribute-mapping/add-edit-variant-attribute-mapping/add-edit-variant-attribute-mapping.component';


@NgModule({
  declarations: [
    VarientAttributeMappingComponent,
    ProductVarientsComponent,
    AddEditProductVariantComponent,
    AddEditVariantAttributeMappingComponent
  ],
  imports: [
    CommonModule,
    VariantsRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule

  ]
})
export class VariantsModule { }
