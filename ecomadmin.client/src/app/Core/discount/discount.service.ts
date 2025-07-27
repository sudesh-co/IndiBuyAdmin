import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private commonController: string = "Common";
  private Controller: string = "Discounts";
    private ApiUrl: string = "https://localhost:7250/api/"

  constructor(private http: HttpClient) { }
  getDropdownData(tableName: string, valueField: string, displayField: string, whereClause: string = ''): Observable<any[]> {
    const obj = {
      tableName,
      valueField,
      displayField,
      whereClause
    };
    return this.http.post<any[]>(this.ApiUrl + this.commonController + "/Get_DDL_Data", obj)

  }

  saveDiscount(payload: any): Observable<boolean> {
    return this.http.post<boolean>(this.ApiUrl + this.Controller +  '/saveDiscount', payload);
  }
  getDiscountList(payload: any): Observable<boolean> {
    return this.http.post<boolean>(this.ApiUrl + this.Controller +  '/getDiscountList', payload);
  }
}
