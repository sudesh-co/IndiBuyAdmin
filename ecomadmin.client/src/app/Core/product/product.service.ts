import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  private controller: string = "Common";
  private Productcontroller: string = "Product";
  private ApiUrl: string = "https://localhost:7250/api/"
  public getCategoriesDDl(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.controller + "/Get_DDL_Data", data)
  }
  public getBrandsDDl(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.controller + "/Get_DDL_Data", data)
  }
  public getProductList(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Productcontroller + "/getProductsList", data)
  }
  public getProductDetails(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Productcontroller + "/getProductDetails", data)
  }
  public AddUpdateProducts(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Productcontroller + "/SaveProduct", data)
  }
}


