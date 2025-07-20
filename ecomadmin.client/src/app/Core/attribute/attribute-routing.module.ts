import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeAddEditComponent } from './attribute-list/attribute-add-edit/attribute-add-edit.component';

const routes: Routes = [
  {
    path: "",
    component: AttributeListComponent
  },
  {
    path: "attr-add-edit",
    component: AttributeAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeRoutingModule { }
