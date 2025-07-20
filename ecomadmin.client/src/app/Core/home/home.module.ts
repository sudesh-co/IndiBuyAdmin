import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeCarouselItemsComponent } from './home-carousel-items/home-carousel-items.component';
import { AddEditHomeCarouselItemsComponent } from './home-carousel-items/add-edit-home-carousel-items/add-edit-home-carousel-items.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../Shared/shared.module';


@NgModule({
  declarations: [
    HomeCarouselItemsComponent,
    AddEditHomeCarouselItemsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class HomeModule { }
