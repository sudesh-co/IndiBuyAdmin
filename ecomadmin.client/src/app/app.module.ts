import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './AdminLayout/layout/layout.component';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { SharedModule } from './Shared/shared.module';
import { TokenInterceptor } from './token.interceptor';
import { MaterialModule } from './material/material.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, MaterialModule,
    LayoutComponent, RouterModule, FormsModule, RouterLink,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,

      useValue: { disabled: true }  // This only disables Material ripple animations
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }

  ]  ,bootstrap: [AppComponent]
})
export class AppModule { }
