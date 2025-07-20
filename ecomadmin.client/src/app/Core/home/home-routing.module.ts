import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCarouselItemsComponent } from './home-carousel-items/home-carousel-items.component';

const routes: Routes = [
  {
    path: "",
    component: HomeCarouselItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
