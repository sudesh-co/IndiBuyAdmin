import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient) { }
  private controller: string = "Common";
  private Productcontroller: string = "ProductAttribute";
  private ApiUrl: string = "https://localhost:7250/api/"

  public getCategoriesDDl(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.controller + "/Get_DDL_Data", data)
  }
  public getAttrubutesList(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Productcontroller + "/getAttrubutesList", data)
  } public getAttrubuteValueList(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Productcontroller + "/getAttrubuteValueList", data)
  }
  public AddUpdateAttrubutes(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Productcontroller + "/InsertUpdateAttributes", data)
  }
  public AddUpdateAttrubutesValue(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Productcontroller + "/AddUpdateAttrubutesValue", data)
  }
}
