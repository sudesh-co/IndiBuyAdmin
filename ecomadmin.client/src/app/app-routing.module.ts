import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './AdminLayout/layout/layout.component';
import { FieldConfigComponent } from './Shared/field-config/field-config.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  // Public routes
  {
    path: 'auth',
    loadChildren: () => import('./Core/auth/auth.module').then(m => m.AuthModule)
  },

  // Protected admin routes
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'category',
        loadChildren: () => import('./Core/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'variant',
        loadChildren: () => import('./Core/variants/variants.module').then(m => m.VariantsModule)
      },
      {
        path: 'attr',
        loadChildren: () => import('./Core/attribute/attribute.module').then(m => m.AttributeModule)
      },
      {
        path: 'product',

        loadChildren: () => import('./Core/product/product.module').then(m => m.ProductModule)
      },

      {
        //canLoad: [AdminGuard],
        //canActivate: [AdminGuard],
        path: 'brands',
        loadChildren: () => import('./Core/brands/brands.module').then(m => m.BrandsModule)
      },
      {
        path: 'dash',
        loadChildren: () => import('./Core/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./Core/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./Core/users/users.module').then(m => m.UsersModule)
      },
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'filedC',
    component: FieldConfigComponent
  },

  {
    path: '**',
    loadChildren: () => import('./Core/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
