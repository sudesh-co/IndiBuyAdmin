import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AddEditUsersComponent } from './admin-users/add-edit-users/add-edit-users.component';
import { SharedModule } from '../../Shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminUsersComponent,
    AddEditUsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
