import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddEditComponent } from './category-list/category-add-edit/category-add-edit.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../Shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryAddEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CategoryModule { }
