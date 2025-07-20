import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  private isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role === 'admin';
    } catch (e) {
      return false;
    }
  }

  canActivate(): boolean {
    return this.isAdmin();
  }

  canLoad(): boolean {
    return this.isAdmin();
  }
}
