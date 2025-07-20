import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../Core/auth/authentication.service';
import { NanaAlertService } from '../../Shared/nana-alert.service';
import { Router } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatChipsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private service: AuthenticationService, private alert_service: NanaAlertService, public router: Router) {

  }
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggle() {
    this.toggleSidebar.emit();
  }
  logout() {
    this.service.logout();
    this.alert_service.confirm("Are you sure you want to log out?").subscribe(x => {
      if (x) {
        setTimeout(() => {
          this.router.navigate(["/auth"])
        }, 2000)
      }
    });

  }
  componentHistory: string[] = [
    'product',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
    'attr',
  ];

  onChipClick(componentName: string) {
    console.log('Navigating to:', componentName);
    this.router.navigate(["/" + componentName ])
  }
}
