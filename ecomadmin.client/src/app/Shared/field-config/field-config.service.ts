import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
export interface FieldConfig {
  viewName: string;
  columnName: string;
  fieldName: string;
  label: string;
  fieldType: string;
  isVisible: boolean;
  sortOrder: number;
}
@Injectable({ providedIn: 'root' })


export class FieldConfigService {
  private controller: string = "Common";
  private Productcontroller: string = "ProductCategory";
  private ApiUrl: string = "https://localhost:7250/api/"
  constructor(private http: HttpClient) { }

  getConfigs(viewName: string): Observable<FieldConfig[]> {
    return this.http.get<FieldConfig[]>(`${this.ApiUrl + this.controller } "/getConfigs" /${viewName}`);
  }

  upsert(config: FieldConfig): Observable<any> {
    return this.http.post<FieldConfig[]>(`${this.ApiUrl + this.controller} "/getConfigs"`, config);
  }
}
