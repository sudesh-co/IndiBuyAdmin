import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditDiscountComponent } from './discounts/add-edit-discount/add-edit-discount.component';
import { DiscountsComponent } from './discounts/discounts.component';

const routes: Routes = [
  {
    path: "",
    component: DiscountsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule { }
