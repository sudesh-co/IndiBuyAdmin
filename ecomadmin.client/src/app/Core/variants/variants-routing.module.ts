import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VarientAttributeMappingComponent } from './varient-attribute-mapping/varient-attribute-mapping.component';

const routes: Routes = [
  {
    path: "variant",
    component: VarientAttributeMappingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariantsRoutingModule { }
