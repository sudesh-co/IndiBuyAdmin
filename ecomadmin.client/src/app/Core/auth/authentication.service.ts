import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private Authcontroller: string = "Authentication";
  private ApiUrl: string = "https://localhost:7250/api/"
  constructor(public http: HttpClient) { }

  public RegisterNewUser(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Authcontroller + "/RegisterNewUser" ,data)
  }
  public login(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Authcontroller + "/login", data)
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.isAdmin === true;
  }

  logout() {
    localStorage.clear();
  }
}
