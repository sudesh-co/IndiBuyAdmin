import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  constructor(private http: HttpClient) { }
  private controller: string = "Common";
  private Brandcontroller: string = "Brands";
  private ApiUrl: string = "https://localhost:7250/api/"

  public getCategoriesDDl(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.controller + "/Get_DDL_Data", data)
  }
  public getBrandsList(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Brandcontroller + "/getBrandsList", data)
  }
  public getBrandDetails(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Brandcontroller + "/getBrandDetails", data)
  }
  public AddUpdateBrands(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Brandcontroller + "/AddUpdateBrands", data)
  }
}
