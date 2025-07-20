import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  private controller: string = "Common";
  private Productcontroller: string = "ProductCategory";
  private ApiUrl: string = "https://localhost:7250/api/"
  public getCategoriesDDl(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.controller + "/Get_DDL_Data",data)
  }

  public getCategoriesList(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Productcontroller + "/getCategoriesList", data)
  }
  public AddUpdateCategories(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Productcontroller + "/AddUpdateCategories", data)
  }
}
