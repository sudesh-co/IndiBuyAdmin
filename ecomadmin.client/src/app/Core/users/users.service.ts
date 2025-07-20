import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appSettings } from '../../appSettings';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  public getUsersList(data: any): Observable<any>{
    return this.http.post(appSettings.ApiUrl + appSettings.usersController + "/GetUsers", {})
  }
  public getUserById(data: any): Observable<any>{
    return this.http.post(appSettings.ApiUrl + appSettings.usersController + "/GetUsers", {})
  }
  public addUpdateUser(data: any): Observable<any>{
    return this.http.post(appSettings.ApiUrl + appSettings.usersController + "/addUpdateUser",data)
  }
}
