import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  menus = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dash',
      color: 'primary'
    },
    {
      label: 'Product',
      icon: 'category',
      color: 'accent',
      children: [
        { label: 'Categories', route: '/category', icon: 'list' },
        { label: 'Attributes', route: '/attr', icon: 'tune' },
        { label: 'Product', route: '/product', icon: 'inventory_2' },
        { label: 'Variants', route: '/variant', icon: 'layers' },
        { label: 'Brands', route: '/brands', icon: 'branding_watermark' }
      ]
    },
    {
      label: 'Home',
      icon: 'receipt_long',
      route: '/home',
      color: 'white'
    },
    {
      label: 'Orders',
      icon: 'receipt_long',
      route: '/orders',
      color: 'warn'
    },
    {
      label: 'Users',
      icon: 'group',
      route: '/users'
    }
  ];

  expandedParents = new Set<string>();

  toggleMenu(label: string) {
    if (this.expandedParents.has(label)) {
      this.expandedParents.delete(label);
    } else {
      this.expandedParents.add(label);
    }
  }

  isExpanded(label: string): boolean {
    return this.expandedParents.has(label);
  }
}
