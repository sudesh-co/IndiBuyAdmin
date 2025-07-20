import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandslistingComponent } from './brandslisting/brandslisting.component';

const routes: Routes = [
  {
    path: '',
    component: BrandslistingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
