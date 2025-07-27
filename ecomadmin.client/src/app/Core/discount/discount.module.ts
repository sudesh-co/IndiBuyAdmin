import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountsComponent } from './discounts/discounts.component';
import { AddEditDiscountComponent } from './discounts/add-edit-discount/add-edit-discount.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DiscountsComponent,
    AddEditDiscountComponent
  ],
  imports: [
    CommonModule,
    DiscountRoutingModule,
    MaterialModule,
    SharedModule, ReactiveFormsModule
  ]
})
export class DiscountModule { }
