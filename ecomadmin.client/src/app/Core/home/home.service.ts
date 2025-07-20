import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = "https://localhost:7250/api/";
  private controller: string = "Home";
  private commonController: string = "Common";

  public getCarouselList(data :any): Observable<any> {
    return this.http.post(this.apiUrl + this.controller + "/getCarouselList",data);
  }
  public getCarouselItemById(id: number): Observable<any> {
    return this.http.post(this.apiUrl + this.controller + "/GetCarouselItemById", { Id: id });
  }

  public saveOrUpdateCarouselItem(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl + this.controller + "/SaveCarouselItem", data);
  }

  public getCategories(): Observable<any> {
    const obj = {
      tableName: 'Categories',
      valueField: 'CategoryId',
      displayField: 'Name',
      whereClause: `IsActive = 1 AND ParentCategoryId IS NULL`
    };
    return this.http.post(this.apiUrl + this.commonController + "/Get_DDL_Data", obj);
  }

  public getSubCategories(parentCatId :number): Observable<any> {
    const obj = {
      tableName: 'Categories',
      valueField: 'CategoryId',
      displayField: 'Name',
      whereClause: `IsActive = 1 AND ParentCategoryId =${parentCatId} `
    };
    return this.http.post(this.apiUrl + this.commonController + "/Get_DDL_Data", obj);
  }

  public getProducts(parentCatId: number): Observable<any> {
    const obj = {
      tableName: 'Products',
      valueField: 'ProductId',
      displayField: 'Name',
      whereClause: `IsDeleted = 0 AND CategoryId =${parentCatId} `
    };
    return this.http.post(this.apiUrl + this.commonController + "/Get_DDL_Data", obj);
  }

}
