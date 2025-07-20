import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { AttributeListComponent } from '../attribute/attribute-list/attribute-list.component';

const routes: Routes = [
  {
    path: "",
    component: CategoryListComponent
  }, {
    path: "attr",
    component: AttributeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
