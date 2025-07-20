import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariantsService {

  constructor(private http: HttpClient) { }

  private controller: string = "Common";
  private Variantcontroller: string = "Variant";
  private ApiUrl: string = "https://localhost:7250/api/"

  getvariantList(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Variantcontroller + "/getvariantList", data)
  }
  addUpdateProductVariants(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Variantcontroller + "/SaveProductVariant", data)
  }
  public getProductVariantDetails(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Variantcontroller + "/getProductVariantDetails", data)
  }

  getvariantAttributeList(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Variantcontroller + "/getVarientAttributesList", data)
  }
  addUpdateVariantAttribute(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Variantcontroller + "/SaveVariantAttributes", data)  
  }
  public getVariantAttributesDetails(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.Variantcontroller + "/getProductVariantDetails", data)
  }

  /*ddl*/
  public VariantAttributeDDL(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.controller + "/Get_DDL_Data", data)
  }
  public VariantAttributeValueDDL(data: any): Observable<any> {
    return this.http.post(this.ApiUrl + this.controller + "/Get_DDL_Data", data)
  }

}
