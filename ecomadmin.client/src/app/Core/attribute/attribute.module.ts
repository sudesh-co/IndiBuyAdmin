import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeAddEditComponent } from './attribute-list/attribute-add-edit/attribute-add-edit.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../Shared/shared.module';
import { AttributeRoutingModule } from './attribute-routing.module';
import { AttributeValueAddEditComponent } from './attribute-list/attribute-value-add-edit/attribute-value-add-edit.component';



@NgModule({
  declarations: [
    AttributeListComponent,
    AttributeAddEditComponent,
    AttributeValueAddEditComponent,

  ],
  imports: [
    CommonModule,
    CommonModule,
    MaterialModule,
    AttributeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AttributeModule { }
